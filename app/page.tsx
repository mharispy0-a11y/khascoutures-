import { Suspense } from "react";
import Hero from "@/components/Hero";
import CollectionsPreview from "@/components/CollectionsPreview";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewForm from "@/components/ReviewForm";
import ContactCTA from "@/components/ContactCTA";
import CustomerOptIn from "@/components/CustomerOptIn";
import UTMCapture from "@/components/UTMCapture";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <UTMCapture />
      </Suspense>
      <Hero />
      <CollectionsPreview />
      <AboutSection />
      <GalleryPreview />
      <TestimonialsSection />
      <ReviewForm />
      <ContactCTA />
      <CustomerOptIn />
    </>
  );
}
