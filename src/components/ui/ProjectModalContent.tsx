"use client";

interface ProjectModalContentProps {
  description: string;
  highlights: string[];
  tags: string[];
}

// Ten komponent odpowiada za WYŁĄCZNIE środkową sekcję treści modalu:
// opis projektu, lista highlights (punktorów) i panel Tech Stack z prawej strony.
//
// To jest tzw. "presentational component" — przyjmuje dane, renderuje HTML.
// Nie ma żadnego stanu, żadnych efektów ubocznych, żadnych zależności od next-intl.
export default function ProjectModalContent({
  description,
  highlights,
  tags,
}: ProjectModalContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Lewa kolumna: opis + highlights (zajmuje 2/3 szerokości na md+) */}
      <div className="md:col-span-2 space-y-4">
        <p className="text-base text-text-muted leading-relaxed">
          {description}
        </p>

        {/* Lista cech projektu — renderowana tylko gdy highlights nie jest puste */}
        {highlights.length > 0 && (
          <ul className="space-y-2 pt-2">
            {highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-text-muted"
              >
                {/* Mały fioletowy punkt jako bullet */}
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Prawa kolumna: Tech Stack (1/3 szerokości na md+) */}
      <div className="bg-background border border-border rounded-xl p-4 h-fit">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3 font-mono">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
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
  );
}
