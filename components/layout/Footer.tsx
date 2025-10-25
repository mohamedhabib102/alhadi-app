// src/components/Footer/Footer.tsx
import React from 'react';
import Logo from '../ui/Logo';
import { 
    companyLinks, 
    serviceLinks, 
    socialLinks, 
    FooterLink }
    from '@/data/FooterLinks';
// استيراد أيقونات (للتواصل الاجتماعي)
import { FaInstagram, FaTwitter, FaTiktok, FaSnapchat } from 'react-icons/fa';

// دالة مساعدة لتحديد الأيقونة
const getSocialIcon = (iconName: string): React.ElementType => {
    switch (iconName) {
        case 'FaInstagram': return FaInstagram;
        case 'FaTwitter': return FaTwitter;
        case 'FaTiktok': return FaTiktok;
        case 'FaSnapchat': return FaSnapchat;
        default: return () => null; 
    }
};


const Footer: React.FC = () => {
    // لون الخلفية الداكن (قريب من الأسود)
    const darkBg = '#1c1e26'; // لون بنفسجي داكن/رمادي غامق أنيق

    return (

        <footer className="pt-16 pb-12 text-white" style={{ backgroundColor: darkBg }} dir="rtl">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* 1. شبكة الأقسام الرئيسية (Logo, Company Links, Services) */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12 border-b border-gray-700 pb-12">
                    
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-right">
                        <Logo color='footer' size='md'/>
                        <p className="mt-4 text-sm text-gray-400 max-w-xs">
                            نكرس جهودنا للرفق بالحيوان وغرس ثقافة التعايش السلمي في مجتمعنا.
                        </p>
                    </div>

                    <div className="text-center lg:text-right">
                        <h4 className="text-xl font-bold mb-4 text-[var(--main-color)] lg:border-r-2 lg:border-r-[var(--main-color)] pr-2">
                            روابط سريعة
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-300 transition duration-300 hover:text-blue-500">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="text-center lg:text-right">
                        <h4 className="text-xl font-bold mb-4 text-[var(--main-color)] lg:border-r-2 lg:border-r-[var(--main-color)] pr-2">
                            المتجر والخدمات
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {serviceLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-300 transition duration-300 hover:text-blue-500">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="text-center lg:text-right">
                        <h4 className="text-xl font-bold mb-4 text-[var(--main-color)] lg:border-r-2 lg:border-r-[var(--main-color)] pr-2">
                            تابعنا على
                        </h4>
                        <div className="flex justify-center lg:justify-start gap-3">
                            {socialLinks.map((link) => {
                                const Icon = getSocialIcon(link.icon!);
                                return (
                                    <a 
                                        key={link.name} 
                                        href={link.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 transition duration-300 hover:bg-blue-400 text-gray-300 hover:text-white"
                                        aria-label={`Follow us on ${link.name}`}
                                    >
                                        <Icon className="text-lg" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center text-lg text-gray-500">
                    <p>&copy; {new Date().getFullYear()} جمعية الهدى للرفق بالحيوان. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;