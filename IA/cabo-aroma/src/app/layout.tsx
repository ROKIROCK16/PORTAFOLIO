import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { getContent } from "@/lib/content";
import "@/styles/globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getContent("settings");
  return {
    title: `${settings.businessName} · ${settings.tagline}`,
    description: settings.tagline,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getContent("settings");
  const { colors } = settings;

  // Brand palette is injected from settings.json so Studio can recolor the site.
  const themeVars = {
    "--brand-primary": colors.primary,
    "--brand-secondary": colors.secondary,
    "--brand-beige": colors.beige,
    "--brand-cream": colors.cream,
    "--brand-dark": colors.dark,
    "--brand-gold": colors.gold,
  } as React.CSSProperties;

  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body style={themeVars} className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
