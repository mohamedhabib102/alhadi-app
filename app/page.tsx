
import { 
  AboutGroup,
  HeroSlider, 
  OurMessage, 
  OurObjectives, 
  ProgramsSection,
  StatsSection
} from "@/components/Home";


export default function Home() {
  return (
    <div className="">
      <main className="">
        <HeroSlider />
        <AboutGroup />
        <ProgramsSection />
        <OurMessage />
        <OurObjectives />
        <StatsSection />
      </main>
    </div>
  );
}
