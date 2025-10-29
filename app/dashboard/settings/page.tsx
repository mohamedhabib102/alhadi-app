import SettingsC from "@/components/dashboard/SettingsC";
import CustomHeader from "@/components/ui/CustomHeader"







const Settings: React.FC = () => {
    return (
        <div className="p-4">
          <CustomHeader 
          content={{ title: " الأقسام ", 
          description: "تحكم في الأقسام" }} />
          <SettingsC />
        </div>
    )
}

export default Settings;