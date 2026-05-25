"use client";

import { Folder } from "lucide-react";

interface ProjectCardThumbnailProps {
  title: string;
}

// Ten komponent odpowiada WYŁĄCZNIE za górną "obrazkową" strefę karty.
// Nie zna nic o modalu, stanie, tłumaczeniach — tylko wyświetla ikonę i tytuł.
export default function ProjectCardThumbnail({
  title,
}: ProjectCardThumbnailProps) {
  return (
    <div className="relative h-48 bg-background border-b border-border flex items-center justify-center overflow-hidden">
      {/* Nakładka gradientowa widoczna tylko na hover rodzica (.group) */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Ikona i nazwa projektu — reagują na hover rodzica */}
      <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-accent group-hover:scale-105 transition-all duration-500">
        <Folder size={32} className="stroke-[1.5]" />
        <span className="font-display font-bold text-xl tracking-tight text-text-primary group-hover:text-accent">
          {title.toLowerCase()}
        </span>
      </div>
    </div>
  );
}
