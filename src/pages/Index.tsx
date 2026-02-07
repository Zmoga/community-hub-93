import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RulesSection from "@/components/RulesSection";
import DiscordSection from "@/components/DiscordSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <RulesSection />
      <DiscordSection />
      <Footer />
    </div>
  );
};

export default Index;
