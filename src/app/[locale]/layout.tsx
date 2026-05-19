import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/lib/routing";
import "../globals.css"; // ścieżka wyżej, bo jesteśmy teraz w podfolderze [locale]

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Sprawdź czy dany język jest obsługiwany
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Pobierz wiadomości z pliku JSON dla danego języka
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
