import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Hero");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-text-primary">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-accent">{t("title")}</h1>
        <p className="text-xl text-text-muted max-w-lg mx-auto">
          {t("subtitle")}
        </p>
        <div className="pt-4">
          <button className="px-6 py-3 bg-accent text-white font-medium rounded-lg shadow-md hover:bg-accent-hover transition-colors">
            {t("cta_work")}
          </button>
        </div>
      </div>
    </main>
  );
}
