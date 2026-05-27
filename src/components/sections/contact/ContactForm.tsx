"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useTranslations } from "next-intl";
import ContactFormFields, { FormData, FormErrors } from "./ContactFormFields";
import ContactSuccess from "./ContactSuccess";

// ContactForm to "smart component" — zna next-intl, zarządza stanem i robi API call.
// Sam nie renderuje żadnego HTML poza owijającym kontenerem.
// Całe UI pochodzi z ContactFormFields i ContactSuccess.

export default function ContactForm() {
  const t = useTranslations("Contact");

  // ── Stan formularza ───────────────────────────────────────────────────────
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // submitError to błąd ogólny (np. serwer niedostępny), nie błąd konkretnego pola.
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Walidacja ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim().length < 2) {
      newErrors.name = t("error_name");
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t("error_email");
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = t("error_message");
    }

    setErrors(newErrors);
    // Object.keys zwraca tablicę kluczy — jeśli jest pusta, błędów nie ma
    return Object.keys(newErrors).length === 0;
  };

  // ── Handler zmiany pola ───────────────────────────────────────────────────
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Aktualizujemy tylko to pole, które się zmieniło.
    // Spread operator (...prev) kopiuje pozostałe pola bez zmian.
    setFormData((prev) => ({ ...prev, [name]: value }));

    // UX: czyścimy błąd danego pola gdy użytkownik zaczyna je poprawiać.
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (submitError) setSubmitError(null);
  };

  // ── Handler wysłania ──────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Walidacja kliencka — szybka odpowiedź dla użytkownika bez round-tripu do serwera
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Wywołujemy nasz własny Route Handler (backend Next.js).
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setIsSuccess(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Reset po sukcesie ─────────────────────────────────────────────────────
  const handleReset = () => {
    setIsSuccess(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-sm max-w-xl mx-auto">
      {isSuccess ? (
        <ContactSuccess
          successMessage={t("success")}
          sendAnotherLabel={t("send_another")}
          onReset={handleReset}
        />
      ) : (
        // Formularz — przekazujemy dane, błędy, stan i handlery
        <>
          <ContactFormFields
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            labels={{
              name: t("name"),
              email: t("email"),
              message: t("message"),
              placeholderName: t("placeholder_name"),
              placeholderEmail: t("placeholder_email"),
              placeholderMessage: t("placeholder_message"),
              send: t("send"),
              sending: t("sending"),
            }}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          {/* Błąd ogólny (np. błąd sieci) — wyświetlany pod formularzem */}
          {submitError && (
            <p className="mt-4 text-sm text-red-500 text-center font-sans">
              {submitError}
            </p>
          )}
        </>
      )}
    </div>
  );
}
