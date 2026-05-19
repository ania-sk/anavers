import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/routing";

export default createMiddleware(routing);

export const config = {
  // Przechwytuj tylko ścieżki stron, pomijaj pliki statyczne (_next, obrazy, favicon)
  matcher: ["/", "/(pl|en)/:path*"],
};
