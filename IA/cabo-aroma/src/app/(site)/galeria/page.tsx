import { Gallery } from "@/components/gallery/Gallery";
import { PageHero } from "@/components/layout/PageHero";
import { getContent } from "@/lib/content";

export const metadata = { title: "Galería · Cabo Aroma" };

export default async function GalleryPage() {
  const gallery = await getContent("gallery");

  return (
    <>
      <PageHero title={gallery.title} subtitle={gallery.subtitle} image={gallery.items[0]?.src ?? "/images/hero.svg"} />
      <div className="mx-auto max-w-7xl px-5 py-16">
        <Gallery items={gallery.items} />
      </div>
    </>
  );
}
