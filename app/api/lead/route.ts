import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

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
  message: z.string().transform(sanitizeMessage).pipe(z.string().min(10).max(1200)),
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
  return [
    "🧠 Новая заявка",
    "",
    `👤 Имя: ${lead.name}`,
    `📞 Телефон: ${lead.phone}`,
    `💬 Сообщение: ${lead.message}`,
    `🌐 Source: ${lead.source}`,
    `🕒 Время: ${new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Moscow",
    }).format(new Date())}`,
  ].join("\n");
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
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Lead submission failed: Telegram env is not configured");
    return NextResponse.json({ error: "Lead service is not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramMessage(parsed.data),
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      console.error("Lead submission failed: Telegram API rejected request", {
        status: response.status,
      });

      return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Lead submission failed: Telegram API request error", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return NextResponse.json({ error: "Lead delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
