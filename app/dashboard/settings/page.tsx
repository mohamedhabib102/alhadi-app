import Slides6Page from "@/components/dashboard/Part";
import SlidesPage from "@/components/dashboard/Part1";
import Slides3Page from "@/components/dashboard/Part2";
import Slides4Page from "@/components/dashboard/Part3";
import Slides5Page from "@/components/dashboard/Part4";
import CustomHeader from "@/components/ui/CustomHeader"







const Settings: React.FC = () => {
    return (
        <div className="p-4">
          <CustomHeader 
          content={{ title: " السلايدات ", 
          description: "تحكم في السلايدات" }} />
          <SlidesPage />

          <CustomHeader 
          content={{ title: " المبادرات والبرامج ", 
          description: "تحكم في المبادرات" }} />
          <Slides3Page />

         
          <CustomHeader 
          content={{ title: " رسالتنا ", 
          description: "تحكم في رسالتنا" }} />
         <Slides4Page/>

          <CustomHeader 
          content={{ title: " أهدافنا ", 
          description: "تحكم في أهدافنا" }} />
         <Slides5Page />

          <CustomHeader 
          content={{ title: " الفعاليات ", 
          description: "تحكم في الفعاليات" }} />
         <Slides6Page/>

        </div>
    )
}

export default Settings;