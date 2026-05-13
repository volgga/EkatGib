import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

class TelegramDeliveryError extends Error {
  constructor(public status?: number) {
    super(status ? `Telegram API status ${status}` : "Telegram API request failed");
  }
}

const rateLimitStore = new Map<string, RateLimitRecord>();

function sanitizeText(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeMessage(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSource(source: string) {
  const normalizedSource = source.replace(/^contact_form:/, "").toLowerCase();

  const labels: Record<string, string> = {
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    max: "MAX",
    phone: "Телефон",
  };

  return labels[normalizedSource] || source;
}

const leadSchema = z.object({
  name: z.string().transform(sanitizeText).pipe(z.string().min(2).max(80)),
  phone: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(5).max(32))
    .refine((value) => {
      const digitsCount = value.replace(/\D/g, "").length;

      return digitsCount >= 10 && digitsCount <= 15;
    }),
  message: z.string().transform(sanitizeMessage).pipe(z.string().max(1200)).optional(),
  source: z.string().transform(sanitizeText).pipe(z.string().min(2).max(120)),
  company: z.string().optional(),
});

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;

  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function cleanupRateLimits() {
  const now = Date.now();

  for (const [ip, record] of rateLimitStore) {
    if (record.resetAt <= now) {
      rateLimitStore.delete(ip);
    }
  }
}

function formatTelegramMessage(lead: z.infer<typeof leadSchema>) {
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  }).format(new Date());

  const messageBlock = lead.message
    ? [
        "💬 <b>Сообщение:</b>",
        escapeHtml(lead.message),
        "",
      ]
    : [];

  return [
    "🔥 <b>Новая заявка</b>",
    "",
    "👤 <b>Имя:</b>",
    escapeHtml(lead.name),
    "",
    "📞 <b>Телефон:</b>",
    escapeHtml(lead.phone),
    "",
    ...messageBlock,
    "🌐 <b>Связаться:</b>",
    escapeHtml(formatSource(lead.source)),
    "",
    "🕒 <b>Время:</b>",
    escapeHtml(formattedDate),
  ].join("\n");
}

function getTelegramChatIds() {
  const chatIds = process.env.TELEGRAM_CHAT_IDS?.split(",")
    .map((chatId) => chatId.trim())
    .filter(Boolean);

  if (chatIds?.length) {
    return chatIds;
  }

  return process.env.TELEGRAM_CHAT_ID ? [process.env.TELEGRAM_CHAT_ID] : [];
}

async function sendTelegramMessage(token: string, chatId: string, text: string) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      throw new TelegramDeliveryError(response.status);
    }
  } catch (error) {
    if (error instanceof TelegramDeliveryError) {
      throw error;
    }

    throw new TelegramDeliveryError();
  }
}

export async function POST(request: NextRequest) {
  cleanupRateLimits();

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead data" }, { status: 422 });
  }

  if (parsed.data.company) {
    return new NextResponse(null, { status: 204 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = getTelegramChatIds();

  if (!token || chatIds.length === 0) {
    console.error("Lead submission failed: Telegram env is not configured");
    return NextResponse.json({ error: "Lead service is not configured" }, { status: 500 });
  }

  const message = formatTelegramMessage(parsed.data);
  const results = await Promise.allSettled(
    chatIds.map((chatId) => sendTelegramMessage(token, chatId, message)),
  );
  const failedResults = results.filter((result) => result.status === "rejected");

  if (failedResults.length > 0) {
    console.warn("Lead submission: Telegram delivery failed for some chats", {
      failed: failedResults.length,
      total: results.length,
    });
  }

  if (failedResults.length === results.length) {
    console.error("Lead submission failed: Telegram delivery failed for all chats");
    return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
