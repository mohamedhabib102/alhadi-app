
import { 
  AboutGroup,
  HeroSlider, 
  OurActivities, 
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
        {/* <OurActivities /> */}
        <StatsSection />
      </main>
    </div>
  );
}
