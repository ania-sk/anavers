import { Server, Layout, Wrench, Brain } from "lucide-react";

export interface Skill {
  name: string;
  category: "backend" | "frontend" | "tools" | "learning";
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  slides?: ProjectSlide[]; // Nowe pole na galerię w modalu
}

export interface ProjectSlide {
  image: string;
  descKey: string; // Klucz do szczegółowego opisu konkretnego zrzutu ekranu
}

// 1. Umiejętności z Twojego pliku skills.md
export const skillsData: Skill[] = [
  // Frontend
  { name: "HTML5 / CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Responsive Design", category: "frontend" },
  { name: "Tailwind CSS v4", category: "frontend" },

  // Backend
  { name: "PHP", category: "backend" },
  { name: "Node.js / Express", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "REST API", category: "backend" },

  // DevOps & Tools
  { name: "Git / GitHub", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Linux / Nginx", category: "tools" },
  { name: "VPS (DigitalOcean)", category: "tools" },
  { name: "PM2", category: "tools" },
  { name: "VS Code", category: "tools" },

  // Currently Learning
  { name: "Next.js App Router", category: "learning" },
  { name: "AI Integrations", category: "learning" },
  { name: "Python", category: "learning" },
  { name: "Scalable Web Architecture", category: "learning" },
];

export const skillCategories = [
  { id: "backend", labelKey: "backend", icon: Server },
  { id: "frontend", labelKey: "frontend", icon: Layout },
  { id: "tools", labelKey: "tools", icon: Wrench },
  { id: "learning", labelKey: "learning", icon: Brain },
];

// 2. Projekty z pliku projects.md (plus anavers.pl)
export const projectsData: Project[] = [
  {
    id: "1",
    title: "SaveWave",
    slug: "savewave",
    tags: ["PHP", "JavaScript", "MySQL", "Tesseract OCR", "Nginx"],
    githubUrl: "https://github.com/ania-sk/savewave",
    liveUrl: "https://savewave.anavers.pl",

    slides: [
      { image: "/projects/savewave-dash.jpg", descKey: "slide_dash" },
      { image: "/projects/savewave-ocr.jpg", descKey: "slide_ocr" },
      { image: "/projects/savewave-anal.jpg", descKey: "slide_anal" },
    ],
  },
  {
    id: "2",
    title: "Keeper App",
    slug: "keeper-app",
    tags: ["React", "Node.js", "Gemini API", "Docker", "Nginx"],
    githubUrl: "https://github.com/ania-sk/keeper-app",
    liveUrl: "https://keeper-app.anavers.pl",
    slides: [
      { image: "/projects/keeper-main.jpg", descKey: "slide_main" },
      { image: "/projects/keeper-ai.jpg", descKey: "slide_ai" },
    ],
  },
  {
    id: "3",
    title: "anavers.pl",
    slug: "anavers",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "next-intl"],
    githubUrl: "https://github.com/ania-sk/anavers",
    slides: [{ image: "/projects/anavers-home.jpg", descKey: "slide_home" }],
  },
];
