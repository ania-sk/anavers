"use client";

import { GitBranch, ExternalLink } from "lucide-react";

interface ProjectCardBodyProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  readMoreLabel: string; // przetłumaczony tekst "Czytaj więcej"
  viewCodeLabel: string; // przetłumaczony tekst "Kod źródłowy"
  visitSiteLabel: string; // przetłumaczony tekst "Odwiedź stronę"
}

// Ten komponent odpowiada WYŁĄCZNIE za dolną, tekstową strefę karty:
// tytuł, ikony linków, opis, tagi i "Czytaj więcej".
// Etykiety tekstowe (readMoreLabel itp.) są przekazywane z zewnątrz jako gotowe
// stringi — dzięki temu ten komponent nie wie nic o next-intl i łatwo go przetestować.
export default function ProjectCardBody({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  readMoreLabel,
  viewCodeLabel,
  visitSiteLabel,
}: ProjectCardBodyProps) {
  return (
    <div className="p-6 flex flex-col flex-grow justify-between">
      <div className="space-y-3">
        {/* Wiersz z tytułem, ikonami linków i "Czytaj więcej" */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-text-primary tracking-tight">
              {title}
            </h3>

            {/*
              e.stopPropagation() zatrzymuje bąbelkowanie zdarzenia click.
              Bez tego kliknięcie w link GitHub otworzyłoby JEDNOCZEŚNIE modal
              i nową zakładkę — co jest niechcianym efektem ubocznym.
            */}
            <div
              className="flex items-center gap-2 text-text-muted"
              onClick={(e) => e.stopPropagation()}
            >
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors p-1"
                  title={viewCodeLabel}
                >
                  <GitBranch size={16} />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors p-1"
                  title={visitSiteLabel}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Pojawia się tylko po najechaniu na kartę (sterowane przez .group w rodzicu) */}
          <span className="text-xs font-mono text-accent bg-accent/5 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ➔ {readMoreLabel}
          </span>
        </div>

        {/* Opis projektu obcięty do 2 linii */}
        <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Tagi technologiczne na dole karty */}
      <div className="flex flex-wrap gap-1.5 pt-4">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-background border border-border text-text-muted"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5">
            +{tags.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}
