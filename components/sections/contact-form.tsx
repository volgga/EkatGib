"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, inputClassName } from "@/components/ui/field";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { reachGoal } from "@/lib/metrika";

type SubmitStatus =
  | {
      type: "success";
      message: string;
    }
  | {
      type: "error";
      message: string;
    }
  | null;

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
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

  async function onSubmit(values: ContactFormValues) {
    setSubmitStatus(null);

    let response: Response;

    try {
      response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          message: values.message,
          source: `contact_form:${values.contactMethod}`,
          company: values.company || "",
        }),
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Не удалось отправить заявку. Попробуйте ещё раз или напишите напрямую.",
      });
      return;
    }

    if (!response.ok) {
      setSubmitStatus({
        type: "error",
        message: "Не удалось отправить заявку. Попробуйте ещё раз или напишите напрямую.",
      });
      return;
    }

    reachGoal("form_submit", { contactMethod: values.contactMethod });
    setSubmitStatus({
      type: "success",
      message: "Заявка отправлена. Екатерина свяжется с вами в ближайшее время.",
    });
    reset({ contactMethod: "whatsapp", company: "" });
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        tabIndex={-1}
        type="text"
        {...register("company")}
      />
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
          {isSubmitting ? "Отправляем..." : "Отправить заявку"}
        </Button>
        <p className="text-center text-xs font-medium text-text/70">
          Первый ответ — без обязательств
        </p>
      </div>
      {submitStatus ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${
            submitStatus.type === "success"
              ? "bg-surface text-headline"
              : "bg-danger/10 text-danger"
          }`}
          role={submitStatus.type === "success" ? "status" : "alert"}
        >
          {submitStatus.message}
        </p>
      ) : null}
    </form>
  );
}
