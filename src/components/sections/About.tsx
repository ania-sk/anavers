"use client";

import { useTranslations } from "next-intl";
import { Heart, Terminal, Code2 } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function About() {
  const t = useTranslations("About");

  const hobbies = [t("hobby_1"), t("hobby_2"), t("hobby_3")];

  return (
    <section
      id="about"
      className="py-20 bg-background transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* 1. ANIMACJA NAGŁÓWKA: delikatne wejście w górę */}
        <ScrollReveal variant="slideUp" duration={0.5}>
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary mb-12 relative inline-block">
            {t("title")}
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded"></span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Lewa kolumna: Estetyczny Wizualny Kontener */}
          <div className="md:col-span-5 flex justify-center relative">
            {/* SUBTELNY GLOW W TLE */}
            <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full scale-75 animate-pulse" />

            {/* 2. ANIMACJA KARTY: wjeżdża z lewej strony z lekkim opóźnieniem */}
            <ScrollReveal variant="slideLeft" delay={0.1} duration={0.7}>
              <div className="relative group w-64 h-64 sm:w-72 sm:h-72 animate-float">
                {/* Ozdobna ramka pod spodem */}
                <div className="absolute inset-0 border-2 border-accent rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>

                {/* Główny kontener - "Karta Dewelopera" */}
                <div className="absolute inset-0 bg-surface border border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-2xl overflow-hidden backdrop-blur-sm">
                  {/* Elementy dekoracyjne wewnątrz karty */}
                  <div className="absolute top-4 left-4 opacity-10">
                    <Terminal size={40} />
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-10 rotate-12">
                    <Code2 size={40} />
                  </div>

                  {/* Główna Ikona */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center relative z-10 border border-accent/20">
                      <Heart
                        size={36}
                        className="fill-accent/10 group-hover:fill-accent/40 transition-colors duration-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] font-bold">
                      ania.dev
                    </p>
                    <h3 className="text-lg text-text-primary font-bold">
                      Full-Stack Dev
                    </h3>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[11px] text-text-muted font-mono uppercase">
                        Status: Coding
                      </p>
                    </div>
                  </div>

                  {/* Szklany pasek na dole */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Prawa kolumna: Tekst Bio */}
          {/* 3. ANIMACJA TREŚCI: cała prawa kolumna płynnie wsuwa się z prawej strony */}
          <div className="md:col-span-7">
            <ScrollReveal variant="slideRight" delay={0.2} duration={0.7}>
              <div className="space-y-6">
                <div className="space-y-4 text-base leading-relaxed text-text-muted font-sans">
                  <p className="text-text-primary font-medium text-lg">
                    {t("p1")}
                  </p>
                  <p>{t("p2")}</p>
                </div>

                {/* Subsekcja: Poza kodem */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-bold text-text-primary mb-4">
                    {t("beyond_title")}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hobbies.map((hobby, index) => (
                      // 4. EFEKT FALI DLA PASJI: każda pasja pojawia się ułamek sekundy po poprzedniej
                      <ScrollReveal
                        key={index}
                        variant="fadeIn"
                        delay={0.3 + index * 0.1}
                        duration={0.4}
                      >
                        <li className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="text-accent mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>{hobby}</span>
                        </li>
                      </ScrollReveal>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
