import { getContent } from "@/lib/content";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { FeaturedSection } from "@/sections/FeaturedSection";
import { MenuPreviewSection } from "@/sections/MenuPreviewSection";
import { ContactSection } from "@/sections/ContactSection";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default async function HomePage() {
  const [home, contact, settings] = await Promise.all([
    getContent("home"),
    getContent("contact"),
    getContent("settings"),
  ]);

  return (
    <>
      <HeroSection hero={home.hero} fallbackLogo={settings.logo} />
      <AboutSection about={home.about} />
      <FeaturedSection featured={home.featured} />
      <MenuPreviewSection menuPreview={home.menuPreview} />
      <section id="contacto" className="pt-8">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle kicker="Contacto" title={contact.title} subtitle={contact.subtitle} />
        </div>
        <ContactSection contact={contact} />
      </section>
    </>
  );
}
