import HeroBanner from "@/components/HeroBanner";
import CategoryCircles from "@/components/CategoryCircles";
import BrandStory from "@/components/BrandStory";
import PromoGrids from "@/components/PromoGrids";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import StoreLocator from "@/components/StoreLocator";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategoryCircles />
      <AboutSection />
      <BrandStory />
      <PromoGrids />
      <ProductGrid />
      <Testimonials />
      <FAQSection />
      <StoreLocator />
    </>
  );
}
