
import { 
  AboutGroup,
  HeroSlider, 
  OurActivities, 
  OurMessage, 
  OurObjectives, 
  ProgramsSection,
  StatsSection
} from "@/components/Home";
import { slides } from "@/data/SliderData";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <HeroSlider data={slides}/>
        <AboutGroup />
        <ProgramsSection />
        <OurMessage />
        <OurObjectives />
        <OurActivities />
        <StatsSection />
      </main>
    </div>
  );
}
