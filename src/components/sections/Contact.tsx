"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const t = useTranslations("Contact");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Walidacja pól formularza
  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim().length < 2) tempErrors.name = t("error_name");
    if (!emailRegex.test(formData.email)) tempErrors.email = t("error_email");
    if (formData.message.trim().length < 10)
      tempErrors.message = t("error_message");

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Czyszczenie błędu danego pola w czasie rzeczywistym podczas pisania
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Symulacja wysyłania zapytania API (np. do Formspree, Web3Forms lub własnego API routingu)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-surface/30 border-t border-border transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Nagłówek sekcji */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary relative inline-block mb-3">
            {t("title")}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded"></span>
          </h2>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Kontener Formularza */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-sm max-w-xl mx-auto">
          {isSuccess ? (
            /* Stan sukcesu po wysłaniu */
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                {t("success")}
              </h3>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs font-mono text-accent hover:underline pt-2"
              >
                ➔ Wyślij kolejną wiadomość
              </button>
            </div>
          ) : (
            /* Główny formularz */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Pole: Imię */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-bold font-mono uppercase tracking-wider text-text-primary"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("placeholder_name")}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 text-sm bg-background border rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary ${
                    errors.name
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-border"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 font-sans">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Pole: Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-bold font-mono uppercase tracking-wider text-text-primary"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("placeholder_email")}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 text-sm bg-background border rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary ${
                    errors.email
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-border"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 font-sans">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Pole: Wiadomość */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold font-mono uppercase tracking-wider text-text-primary"
                >
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("placeholder_message")}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 text-sm bg-background border rounded-lg focus:outline-none focus:border-accent transition-all resize-none text-text-primary ${
                    errors.message
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-border"
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1 font-sans">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Przycisk wysyłania */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover disabled:bg-accent/50 transition-colors shadow-sm flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t("sending")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("send")}</span>
                    <Send
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
