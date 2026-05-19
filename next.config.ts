import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Wskazujemy wtyczce precyzyjną ścieżkę do pliku request w folderze lib
const withNextIntl = createNextIntlPlugin("./src/lib/request.ts");

const nextConfig: NextConfig = {
  /* Tutaj ewentualne przyszłe opcje konfiguracji */
};

export default withNextIntl(nextConfig);
