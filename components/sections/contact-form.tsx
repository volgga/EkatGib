"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, inputClassName } from "@/components/ui/field";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { reachGoal } from "@/lib/metrika";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactMethod: "whatsapp",
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.info("Contact request draft", values);
    reachGoal("form_submit", { contactMethod: values.contactMethod });
    setSent(true);
    reset({ contactMethod: "whatsapp" });
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Имя" error={errors.name?.message}>
        <Input autoComplete="name" placeholder="Как к вам обращаться" {...register("name")} />
      </Field>
      <Field label="Телефон" error={errors.phone?.message}>
        <Input
          autoComplete="tel"
          inputMode="tel"
          placeholder="+7 900 000-00-00 или +33 6 00 00 00 00"
          type="tel"
          {...register("phone")}
        />
        <span className="text-xs font-medium text-text/65">
          Можно указать номер любой страны
        </span>
      </Field>
      <Field label="Способ связи" error={errors.contactMethod?.message}>
        <select className={inputClassName()} {...register("contactMethod")}>
          <option value="whatsapp">WhatsApp</option>
          <option value="telegram">Telegram</option>
          <option value="max">MAX</option>
          <option value="phone">Звонок</option>
        </select>
      </Field>
      <Field label="Описание ситуации" error={errors.message?.message}>
        <Textarea
          placeholder="Коротко опишите, что происходит и какая помощь нужна"
          {...register("message")}
        />
      </Field>
      <div className="grid gap-2">
        <Button className="rounded-xl" disabled={isSubmitting} type="submit">
          Отправить заявку
        </Button>
        <p className="text-center text-xs font-medium text-text/70">
          Первый ответ — без обязательств
        </p>
      </div>
      {sent ? (
        <p className="rounded-lg bg-surface px-4 py-3 text-sm text-headline" role="status">
          Заявка подготовлена. Интеграция с Telegram будет подключена позже.
        </p>
      ) : null}
    </form>
  );
}
