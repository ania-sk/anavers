"use client";

import { Project } from "@/src/lib/data";
import ProjectModalHeader from "./ProjectModalHeader";
import ProjectModalContent from "./ProjectModalContent";
import ProjectModalGallery from "./ProjectModalGallery";

interface ProjectModalProps {
  project: Project;
  description: string;
  highlights: string[];
  currentSlide: number;
  slideDescription: string;
  // Etykiety przycisków — gotowe stringi po tłumaczeniu
  viewCodeLabel: string;
  visitSiteLabel: string;
  closeLabel: string;
  // Callbacki przekazane z ProjectCard
  onClose: () => void;
  onNextSlide: (e: React.MouseEvent) => void;
  onPrevSlide: (e: React.MouseEvent) => void;
}

// Ten komponent zarządza WYŁĄCZNIE strukturą okna modalnego:
// ciemne tło-overlay + białe okienko z zawartością.
//
// Klik w overlay (ciemne tło) => zamknięcie modalu przez onClose.
// e.stopPropagation() w okienku zapobiega "przebijaniu" kliknięcia przez do overlaya.
//
// Modal składa z trzech podkomponentów:
//   ProjectModalHeader  — tytuł, linki, przycisk X
//   ProjectModalContent — opis, highlights, tech stack
//   ProjectModalGallery — galeria screenshotów
export default function ProjectModal({
  project,
  description,
  highlights,
  currentSlide,
  slideDescription,
  viewCodeLabel,
  visitSiteLabel,
  closeLabel,
  onClose,
  onNextSlide,
  onPrevSlide,
}: ProjectModalProps) {
  const hasSlides = project.slides && project.slides.length > 0;

  return (
    // Overlay — ciemne półprzezroczyste tło za modalem
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Właściwe okienko modalu */}
      <div
        className="bg-surface border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nagłówek: tytuł, linki, przycisk zamknięcia */}
        <ProjectModalHeader
          title={project.title}
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          viewCodeLabel={viewCodeLabel}
          visitSiteLabel={visitSiteLabel}
          closeLabel={closeLabel}
          onClose={onClose}
        />

        {/* Treść główna modalu */}
        <div className="p-6 space-y-8">
          {/* Opis, highlights, tech stack */}
          <ProjectModalContent
            description={description}
            highlights={highlights}
            tags={project.tags}
          />

          {/* Galeria */}
          {hasSlides && project.slides && (
            <ProjectModalGallery
              slides={project.slides}
              currentSlide={currentSlide}
              projectTitle={project.title}
              slideDescription={slideDescription}
              onNext={onNextSlide}
              onPrev={onPrevSlide}
            />
          )}
        </div>
      </div>
    </div>
  );
}
