"use client";

import { GitBranch, ExternalLink, X } from "lucide-react";

interface ProjectModalHeaderProps {
  title: string;
  githubUrl?: string;
  liveUrl?: string;
  viewCodeLabel: string;
  visitSiteLabel: string;
  closeLabel: string;
  onClose: () => void; // callback — nie znamy implementacji, tylko sygnaturę
}

// Ten komponent to WYŁĄCZNIE pasek na górze modalu:
// tytuł projektu, linki GitHub/live, przycisk zamknięcia (X).
// Jest "sticky" (przykleja się do góry przy scrollowaniu modalu).
// Otrzymuje onClose jako props — nie wie JAK modal się zamknie, tylko SYGNALIZUJE chęć zamknięcia.
export default function ProjectModalHeader({
  title,
  githubUrl,
  liveUrl,
  viewCodeLabel,
  visitSiteLabel,
  closeLabel,
  onClose,
}: ProjectModalHeaderProps) {
  return (
    <div className="p-6 border-b border-border flex items-center justify-between bg-surface sticky top-0 z-10">
      <div>
        <h3 className="text-2xl font-bold text-text-primary font-display">
          {title}
        </h3>

        {/* Linki pod tytułem */}
        <div className="flex gap-4 mt-1">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-text-muted hover:text-accent flex items-center gap-1 transition-colors"
            >
              <GitBranch size={14} /> {viewCodeLabel}
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-text-muted hover:text-accent flex items-center gap-1 transition-colors"
            >
              <ExternalLink size={14} /> {visitSiteLabel}
            </a>
          )}
        </div>
      </div>

      {/* Przycisk zamknięcia — wywołuje onClose przekazany z góry */}
      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-background text-text-muted hover:text-text-primary transition-colors"
        title={closeLabel}
      >
        <X size={20} />
      </button>
    </div>
  );
}
