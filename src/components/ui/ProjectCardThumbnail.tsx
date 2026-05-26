"use client";

import { Folder } from "lucide-react";
import Image from "next/image";

interface ProjectCardThumbnailProps {
  title: string;
  thumbnail?: string;
}

// Ten komponent odpowiada WYŁĄCZNIE za górną "obrazkową" strefę karty.
// Nie zna nic o modalu, stanie, tłumaczeniach — tylko wyświetla ikonę i tytuł.
// Dzięki temu jeśli w przyszłości dodasz prawdziwy screenshot (next/image),
// zmienisz tylko ten plik, nie dotykając reszty.
export default function ProjectCardThumbnail({
  title,
  thumbnail,
}: ProjectCardThumbnailProps) {
  return (
    <div className="relative h-48 bg-background border-b border-border flex items-center justify-center overflow-hidden">
      {thumbnail ? (
        // ── Wariant ze screenshotem ──────────────────────────────────────
        // Next.js Image wymaga fill + position:relative na rodzicu (już jest).
        // object-cover przycina obrazek tak, żeby wypełnił cały kontener h-48
        // bez białych pasków, niezależnie od proporcji oryginału.
        // group-hover:scale-105 daje subtelny efekt "zoomu" przy najechaniu.
        <Image
          src={thumbnail}
          alt={`${title} screenshot`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      ) : (
        // ── Wariant z placeholderem (obecny kod, bez zmian) ──────────────
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-accent group-hover:scale-105 transition-all duration-500">
            <Folder size={32} className="stroke-[1.5]" />
            <span className="font-display font-bold text-xl tracking-tight text-text-primary group-hover:text-accent">
              {title.toLowerCase()}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
