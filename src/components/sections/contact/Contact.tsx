"use client";

import { useTranslations } from "next-intl";
import ContactForm from "@/src/components/sections/contact/ContactForm";
import ScrollReveal from "@/src/components/ui/ScrollReveal";

// Contact.tsx pełni teraz rolę czystego "layout wrapper" — odpowiada tylko za:
//   1. Opakowującą sekcję z odpowiednim id (do nawigacji #contact)
//   2. Nagłówek i podtytuł sekcji
//   3. Umieszczenie ContactForm we właściwym miejscu
//
//  cała logika i stan trafiły do ContactForm.
export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      className="py-20 bg-surface/30 border-t border-border transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Nagłówek sekcji */}
        <ScrollReveal variant="fadeIn" delay={0.2} duration={0.8}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary relative inline-block mb-3">
              {t("title")}
              {/* Fioletowa kreska pod nagłówkiem — wyśrodkowana przez translate */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded" />
            </h2>
            <p className="text-sm text-text-muted max-w-md mx-auto mt-4">
              {t("subtitle")}
            </p>
          </div>
        </ScrollReveal>
        {/* Formularz kontaktowy ze wszystką logiką */}
        <ScrollReveal variant="slideUp" delay={0.4} duration={0.8}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
