"use client";

import { useTranslations } from "next-intl";
import { skillsData, skillCategories } from "@/src/lib/data";
import ScrollReveal from "../ui/ScrollReveal";

export default function Skills() {
  const t = useTranslations("Skills");

  return (
    <section
      id="skills"
      className="py-20 bg-surface/30 border-y border-border transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/*Animacja nagłówek sekcji */}
        <ScrollReveal variant="slideUp" duration={0.5}>
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary mb-12 relative inline-block">
            {t("title")}
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded"></span>
          </h2>
        </ScrollReveal>

        {/*Animacja Siatki kategorii */}
        <ScrollReveal variant="slideLeft" delay={0.1} duration={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              // Filtrujemy technologie należące do danej kategorii
              const categorySkills = skillsData.filter(
                (skill) => skill.category === category.id,
              );

              return (
                <div
                  key={category.id}
                  className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <ScrollReveal variant="fadeIn" delay={0.3} duration={0.9}>
                    <div>
                      {/* Nagłówek kategorii z ikoną */}
                      <div className="flex items-center gap-3 mb-5 text-accent">
                        <IconComponent size={20} className="stroke-[2]" />
                        <h3 className="text-lg font-bold text-text-primary">
                          {t(category.labelKey)}
                        </h3>
                      </div>

                      {/* Lista technologii wewnątrz kategorii */}

                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill.name}
                            className="text-xs font-medium font-mono px-3 py-1.5 rounded-md bg-background border border-border text-text-muted hover:text-accent hover:border-accent transition-colors duration-200"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>{" "}
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
