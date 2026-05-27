"use client";

import { Send } from "lucide-react";
import { ChangeEvent } from "react";

// Typujemy kształt danych formularza — to sam interface, nie komponent.
// Eksportujemy go, żeby rodzic (ContactForm) mógł go użyć i zachować spójność typów.
export interface FormData {
  name: string;
  email: string;
  message: string;
}

// Typujemy błędy — każde pole może mieć błąd (string) lub nie (undefined).
// Partial<Record<keyof FormData, string>> to TypeScriptowy skrót:
//   { name?: string; email?: string; message?: string }
export type FormErrors = Partial<Record<keyof FormData, string>>;

interface ContactFormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  labels: {
    name: string;
    email: string;
    message: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderMessage: string;
    send: string;
    sending: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactFormFields({
  formData,
  errors,
  isSubmitting,
  labels,
  onChange,
  onSubmit,
}: ContactFormFieldsProps) {
  const inputClass = (fieldName: keyof FormErrors) =>
    `w-full px-4 py-2.5 text-sm bg-background border rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary ${
      errors[fieldName]
        ? "border-red-500/50 focus:border-red-500"
        : "border-border"
    }`;

  return (
    // noValidate wyłącza wbudowaną walidację przeglądarki.
    // Dlaczego? Bo chcemy mieć pełną kontrolę nad wyglądem błędów.
    // własna walidacja (w ContactForm) zastępuje tę przeglądarkową.
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* ── Pole: Imię ─────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-xs font-bold font-mono uppercase tracking-wider text-text-primary"
        >
          {labels.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          // value steruje tym, co widzi użytkownik — pochodzi ze stanu rodzica
          value={formData.name}
          onChange={onChange}
          placeholder={labels.placeholderName}
          disabled={isSubmitting}
          className={inputClass("name")}
        />
        {/* Błąd renderuje się warunkowo — tylko gdy errors.name ma wartość */}
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* ── Pole: Email ─────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-xs font-bold font-mono uppercase tracking-wider text-text-primary"
        >
          {labels.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder={labels.placeholderEmail}
          disabled={isSubmitting}
          className={inputClass("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* ── Pole: Wiadomość ─────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="text-xs font-bold font-mono uppercase tracking-wider text-text-primary"
        >
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={onChange}
          placeholder={labels.placeholderMessage}
          disabled={isSubmitting}
          // resize-none wyłącza możliwość ręcznego rozciągania textarea przez użytkownika.
          // Zachowuje to schludny wygląd formularza.
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message}</p>
        )}
      </div>

      {/* ── Przycisk wysyłania ──────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover disabled:bg-accent/50 transition-colors shadow-sm flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          // Stan ładowania: spinner + tekst "Wysyłanie..."
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{labels.sending}</span>
          </>
        ) : (
          // Stan normalny: tekst + ikona ze animacją hover
          <>
            <span>{labels.send}</span>
            <Send
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </>
        )}
      </button>
    </form>
  );
}
