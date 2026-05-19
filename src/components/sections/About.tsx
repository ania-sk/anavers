"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export default function About() {
  const t = useTranslations("About");

  const hobbies = [t("hobby_1"), t("hobby_2"), t("hobby_3")];

  return (
    <section
      id="about"
      className="py-20 bg-background transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Nagłówek sekcji */}
        <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary mb-12 relative inline-block">
          {t("title")}
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Lewa kolumna: Estetyczny Wizualny Kontener (miejsce na zdjęcie / grafikę) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72">
              {/* Ozdobna fioletowa ramka pod spodem */}
              <div className="absolute inset-0 border-2 border-accent rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>

              {/* Główny kontener na zdjęcie */}
              <div className="absolute inset-0 bg-surface border border-border rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-sm overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Heart size={28} />
                </div>
                <p className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  ania.dev
                </p>
                <p className="text-sm text-text-primary font-medium mt-2">
                  Self-taught Developer
                </p>
                <p className="text-xs text-text-muted mt-1">Est. 2021</p>
              </div>
            </div>
          </div>

          {/* Prawa kolumna: Tekst Bio */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-4 text-base leading-relaxed text-text-muted font-sans">
              <p className="text-text-primary font-medium text-lg">{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>

            {/* Subsekcja: Poza kodem */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-bold text-text-primary mb-4">
                {t("beyond_title")}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hobbies.map((hobby, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span className="text-accent mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{hobby}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
