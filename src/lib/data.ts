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

// 2. Projekty z pliku projects.md (plus anavers.pl)
export const projectsData: Project[] = [
  {
    id: "1",
    title: "SaveWave",
    slug: "savewave",
    tags: ["PHP", "JavaScript", "MySQL", "Tesseract OCR", "Nginx"],
    githubUrl: "https://github.com/ania-sk/savewave",
  },
  {
    id: "2",
    title: "Keeper App",
    slug: "keeper-app",
    tags: ["React", "Node.js", "Gemini API", "Docker", "Nginx"],
    githubUrl: "https://github.com/ania-sk/keeper-app",
  },
  {
    id: "3",
    title: "anavers.pl",
    slug: "anavers",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "next-intl"],
    liveUrl: "https://anavers.pl",
  },
];

export const skillCategories = [
  { id: "backend", labelKey: "backend", icon: Server },
  { id: "frontend", labelKey: "frontend", icon: Layout },
  { id: "tools", labelKey: "tools", icon: Wrench },
  { id: "learning", labelKey: "learning", icon: Brain },
];
