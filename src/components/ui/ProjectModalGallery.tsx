"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectSlide } from "@/src/lib/data";

interface ProjectModalGalleryProps {
  slides: ProjectSlide[];
  currentSlide: number;
  projectTitle: string;
  slideDescription: string;
  onNext: (e: React.MouseEvent) => void;
  onPrev: (e: React.MouseEvent) => void;
}

export default function ProjectModalGallery({
  slides,
  currentSlide,
  projectTitle,
  slideDescription,
  onNext,
  onPrev,
}: ProjectModalGalleryProps) {
  // Pobieramy aktualny slajd raz, żeby nie powtarzać indexowania w JSX
  const slide = slides[currentSlide];

  // Gdy type jest undefined lub "screenshot" — standardowy wygląd.
  // Gdy type === "diagram" — inne obramowanie i etykieta.
  const isDiagram = slide.type === "diagram";

  return (
    <div className="space-y-4 border-t border-border pt-6">
      {/* Okienko obrazka */}
      <div
        className={`relative aspect-video w-full rounded-xl overflow-hidden border ${
          isDiagram
            ? "border-accent/40 bg-surface" // diagram: delikatna fioletowa ramka
            : "border-border bg-background" // screenshot: standardowa szara ramka
        }`}
      >
        <Image
          src={slide.image}
          alt={`${projectTitle} — ${isDiagram ? "diagram" : "screenshot"} ${currentSlide + 1}`}
          fill
          className={isDiagram ? "object-contain p-4" : "object-cover"}
          sizes="(max-width: 768px) 100vw, 800px"
          priority={currentSlide === 0}
        />

        {/* Etykieta "Diagram" widoczna tylko dla slajdów typu diagram */}
        {isDiagram && (
          <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider bg-accent text-white px-2 py-0.5 rounded">
            Diagram
          </span>
        )}

        {/* Strzałki nawigacji */}
        {slides.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 border border-border text-text-primary hover:bg-surface shadow-md hover:scale-105 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 border border-border text-text-primary hover:bg-surface shadow-md hover:scale-105 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Kropki-indykatory */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide ? "w-4 bg-accent" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Opis slajdu */}
      <div className="bg-background border-l-2 border-accent rounded-r-lg p-4">
        <p className="text-sm text-text-muted leading-relaxed font-sans">
          {slideDescription}
        </p>
      </div>
    </div>
  );
}
