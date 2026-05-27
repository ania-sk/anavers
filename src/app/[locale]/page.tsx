import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";
import Skills from "@/src/components/sections/Skills";
import Projects from "@/src/components/sections/Projects";
import Contact from "@/src/components/sections/contact/Contact";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

// Funkcja generująca dynamiczne meta tagi i Open Graph dla robotów/botów
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Pobieramy tłumaczenia asynchronicznie po stronie serwera z odpowiedniego namespace
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const baseUrl = "https://anavers.pl";

  return {
    title: t("title"),
    description: t("description"),

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "Anavers Portfolio",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
