import Hero from "@/components/Hero";
import CollectionsPreview from "@/components/CollectionsPreview";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <CollectionsPreview />
      <AboutSection />
      <GalleryPreview />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}
