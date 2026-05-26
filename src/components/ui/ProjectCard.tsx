"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Project } from "@/src/lib/data";

import ProjectCardThumbnail from "./ProjectCardThumbnail";
import ProjectCardBody from "./ProjectCardBody";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
}

// ProjectCard to tzw. "smart component" / "container component".
// Jego jedyna odpowiedzialność to:
//   1. Zarządzanie stanem (czy modal jest otwarty? który slajd?)
//   2. Logika biznesowa (nextSlide, prevSlide, wyciąganie highlights)
//   3. Pobranie tłumaczeń z next-intl
//   4. Złożenie wszystkich podkomponentów razem
//
// Sam NIE renderuje żadnego HTML poza owijającym <div> karty.
// Wszystko co widoczne pochodzi z podkomponentów.
export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("Projects");

  // ── Stan ──────────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ── Efekty uboczne ────────────────────────────────────────────────────────

  // Blokowanie scrollowania strony gdy modal jest otwarty.
  // Funkcja czyszcząca (return) przywraca scroll gdy komponent się odmontowuje
  // lub gdy isModalOpen zmieni się z true na false.
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // ── Dane pochodne ─────────────────────────────────────────────────────────

  // Opis pobierany z pliku tłumaczeń na podstawie slug projektu.
  // np. dla slug="savewave" pobiera klucz "savewave_desc"
  const description = t(`${project.slug}_desc`);

  // Wyciągamy highlights w pętli: sprawdzamy czy istnieje klucz "_h1", "_h2", itd.
  const highlights: string[] = [];
  let i = 1;
  while (t.has(`${project.slug}_h${i}`)) {
    highlights.push(t(`${project.slug}_h${i}`));
    i++;
  }

  // Opis aktualnie widocznego slajdu w galerii
  const slideDescription =
    project.slides && project.slides.length > 0
      ? t(`${project.slug}_${project.slides[currentSlide].descKey}`)
      : "";

  // ── Handlery zdarzeń ──────────────────────────────────────────────────────

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentSlide(0); // Przy każdym otwarciu zaczynamy od pierwszego slajdu
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // Operator modulo (%) sprawia, że po ostatnim slajdzie wracamy do pierwszego
  // i analogicznie: przed pierwszym lądujemy na ostatnim.
  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation(); // Zapobiega zamknięciu modalu przez klik w overlay
    if (project.slides) {
      setCurrentSlide((prev) => (prev + 1) % project.slides!.length);
    }
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.slides) {
      setCurrentSlide(
        (prev) => (prev - 1 + project.slides!.length) % project.slides!.length,
      );
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    // Fragment (<>) pozwala zwrócić dwa elementy bez dodatkowego <div>:
    // kartę projektu i modal
    <>
      {/* Karta projektu — klikalny trigger otwierający modal */}
      <div
        onClick={handleOpenModal}
        className="group bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        {/* Górna część: ikona/placeholder graficzny */}
        <ProjectCardThumbnail
          title={project.title}
          thumbnail={project.thumbnail}
        />

        {/* Dolna część: opis, linki, tagi */}
        <ProjectCardBody
          title={project.title}
          description={description}
          tags={project.tags}
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          readMoreLabel={t("read_more")}
          viewCodeLabel={t("view_code")}
          visitSiteLabel={t("url")}
        />
      </div>

      {/* Modal — renderowany warunkowo, "poza" kartą w drzewie React */}
      {isModalOpen && (
        <ProjectModal
          project={project}
          description={description}
          highlights={highlights}
          currentSlide={currentSlide}
          slideDescription={slideDescription}
          viewCodeLabel={t("view_code")}
          visitSiteLabel={t("url")}
          closeLabel={t("close")}
          onClose={handleCloseModal}
          onNextSlide={handleNextSlide}
          onPrevSlide={handlePrevSlide}
        />
      )}
    </>
  );
}
