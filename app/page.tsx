import HeroSection from "@/components/home/HeroSection";
import LatestPostSection from "@/components/home/LatestPostSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="wrapper">
        <LatestPostSection />
      </div>
    </div>
  );
}
