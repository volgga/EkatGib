import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  phone: z
    .string()
    .refine((value) => value.replace(/\D/g, "").length > 0, {
      message: "Укажите номер телефона",
    })
    .refine((value) => {
      const digitsCount = value.replace(/\D/g, "").length;

      return digitsCount >= 10 && digitsCount <= 15;
    }, {
      message: "Укажите номер в международном формате",
    }),
  contactMethod: z.enum(["phone", "whatsapp", "telegram", "max"]),
  message: z.string().max(1200, "Сократите сообщение").optional(),
  company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
