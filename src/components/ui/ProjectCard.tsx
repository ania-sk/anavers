"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Project } from "@/src/lib/data";
import {
  GitBranch,
  ExternalLink,
  Folder,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("Projects");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Blokowanie przewijania strony (body scroll), gdy modal jest otwarty
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const description = t(`${project.slug}_desc`);
  const hasSlides = project.slides && project.slides.length > 0;

  // Funkcje nawigacji po slajdach
  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.slides) {
      setCurrentSlide((prev) => (prev + 1) % project.slides!.length);
    }
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.slides) {
      setCurrentSlide(
        (prev) => (prev - 1 + project.slides!.length) % project.slides!.length,
      );
    }
  };

  // Wyciąganie punktów Highlights
  const highlights: string[] = [];
  let i = 1;
  while (t.has(`${project.slug}_h${i}`)) {
    highlights.push(t(`${project.slug}_h${i}`));
    i++;
  }

  return (
    <>
      {/* KARTA PROJEKTU (Główny trigger otwarcia Modalu) */}
      <div
        onClick={() => {
          setIsModalOpen(true);
          setCurrentSlide(0);
        }}
        className="group bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        {/* Placeholder wizualny */}
        <div className="relative h-48 bg-background border-b border-border flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-accent group-hover:scale-105 transition-all duration-500">
            <Folder size={32} className="stroke-[1.5]" />
            <span className="font-display font-bold text-xl tracking-tight text-text-primary group-hover:text-accent">
              {project.title.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Zawartość skrócona karty */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div className="space-y-3">
            {/* Tytuł i ikony linków */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-text-primary tracking-tight">
                  {project.title}
                </h3>

                {/* Kontener z ikonami linków - e.stopPropagation() zapobiega otwarciu modalu przy kliknięciu w link */}
                <div
                  className="flex items-center gap-2 text-text-muted"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors p-1"
                      title={t("view_code")}
                    >
                      <GitBranch size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors p-1"
                      title={t("url")}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Przycisk informujący o możliwości interakcji */}
              <span className="text-xs font-mono text-accent bg-accent/5 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ➔ {t("read_more")}
              </span>
            </div>

            {/* Opis projektu */}
            <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Tagi na dole karty */}
          <div className="flex flex-wrap gap-1.5 pt-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-background border border-border text-text-muted"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* OKNO MODALNE (Wyświetlane warunkowo) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-surface border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col transition-transform scale-100"
            onClick={(e) => e.stopPropagation()} // Zabezpieczenie przed zamykaniem przy kliku wewnątrz
          >
            {/* Nagłówek modalu */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface sticky top-0 z-10">
              <div>
                <h3 className="text-2xl font-bold text-text-primary font-display">
                  {project.title}
                </h3>
                <div className="flex gap-4 mt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-text-muted hover:text-accent flex items-center gap-1"
                    >
                      <GitBranch size={14} /> {t("view_code")}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-text-muted hover:text-accent flex items-center gap-1"
                    >
                      <ExternalLink size={14} /> {t("url")}
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-background text-text-muted hover:text-text-primary transition-colors"
                title={t("close")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Główna zawartość modalu */}
            <div className="p-6 space-y-8">
              {/* Sekcja opisu tekstowego */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <p className="text-base text-text-muted leading-relaxed">
                    {description}
                  </p>

                  {/* Cechy / Highlights */}
                  {highlights.length > 0 && (
                    <ul className="space-y-2 pt-2">
                      {highlights.map((h, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-text-muted"
                        >
                          <span className="text-accent mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Panel boczny ze stackiem technologicznym */}
                <div className="bg-background border border-border rounded-xl p-4 h-fit">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3 font-mono">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* OKIENKO ZE SCREENSHOTAMI (GALERIA) */}
              {hasSlides && project.slides && (
                <div className="space-y-4 border-t border-border pt-6">
                  <div className="relative aspect-video w-full bg-background border border-border rounded-xl overflow-hidden flex items-center justify-center group/slider">
                    {/* Wygodne, bezpieczne okienko-placeholder imitujące prawdziwy screen dopóki nie dodasz plików graficznych */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-background to-surface p-4 text-center">
                      <span className="text-4xl mb-2">📸</span>
                      <span className="font-mono text-sm text-text-primary font-bold">
                        {project.title} - Sreenshot {currentSlide + 1}
                      </span>
                      <span className="text-xs font-mono text-text-muted mt-1">
                        {project.slides[currentSlide].image}
                      </span>
                    </div>

                    {/* Lewa strzałka nawigacji */}
                    {project.slides.length > 1 && (
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 p-2 rounded-full bg-surface/80 border border-border text-text-primary hover:bg-surface shadow-md hover:scale-105 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}

                    {/* Prawa strzałka nawigacji */}
                    {project.slides.length > 1 && (
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 p-2 rounded-full bg-surface/80 border border-border text-text-primary hover:bg-surface shadow-md hover:scale-105 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    )}

                    {/* Kropki / Indykatory pozycji na dole obrazka */}
                    <div className="absolute bottom-4 flex gap-1.5">
                      {project.slides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? "w-4 bg-accent" : "w-1.5 bg-text-muted/40"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* DEDYKOWANY OPIS SCREENU POD OKIENKIEM */}
                  <div className="bg-background border-l-2 border-accent rounded-r-lg p-4 transition-all">
                    <p className="text-sm text-text-muted leading-relaxed font-sans">
                      {t(
                        `${project.slug}_${project.slides[currentSlide].descKey}`,
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
