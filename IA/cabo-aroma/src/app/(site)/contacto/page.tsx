import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/sections/ContactSection";
import { getContent } from "@/lib/content";

export const metadata = { title: "Contáctanos · Cabo Aroma" };

export default async function ContactPage() {
  const contact = await getContent("contact");

  return (
    <>
      <PageHero title={contact.title} subtitle={contact.subtitle} image="/images/about.svg" />
      <ContactSection contact={contact} />
    </>
  );
}
