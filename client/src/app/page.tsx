import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import BrandShowcase from "@/components/home/BrandShowcase";
import BestSellers from "@/components/home/BestSellers";
import Categories from "@/components/home/Categories";
import CookAnything from "@/components/home/CookAnything";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Story from "@/components/home/Story";
import ProcessStory from "@/components/home/ProcessStory";
import Recipes from "@/components/home/Recipes";
import Offers from "@/components/home/Offers";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-accent/20 selection:text-primary">
      <Hero />
      <Features />
      <BrandShowcase />
      <BestSellers />
      <Categories />
      <CookAnything />
      <WhyChooseUs />
      <Story />
      <ProcessStory />
      <Recipes />
      <Offers />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
