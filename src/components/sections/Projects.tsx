"use client";

import { useTranslations } from "next-intl";
import { projectsData } from "@/src/lib/data";
import ProjectCard from "@/src/components/ui/ProjectCard";

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section
      id="projects"
      className="py-20 bg-background transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Nagłówek sekcji */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary relative inline-block mb-2">
            {t("title")}
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded"></span>
          </h2>
        </div>

        {/* Siatka projektów */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {projectsData.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
