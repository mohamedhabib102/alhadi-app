import React from 'react';
import Logo from '../ui/Logo';
import { 
    companyLinks, 
    serviceLinks, 
    socialLinks, 
} from '@/data/FooterLinks';


import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaTwitter, FaTiktok, FaSnapchat } from 'react-icons/fa';

const getSocialIcon = (iconName: string): React.ElementType => {
    switch (iconName) {
        case 'FaInstagram': return FaInstagram;
        case 'FaTwitter': return FaTwitter;
        case 'FaTiktok': return FaTiktok;
        case 'FaSnapchat': return FaSnapchat;
        case 'BsTwitterX': return BsTwitterX; 
        default: return () => null; 
    }
};


const Footer: React.FC = () => {
    return (
        <footer className="pt-16 pb-12 text-white bg-[#272f51]" dir='rtl'>
            <div className="container mx-auto px-3.5">
                
             
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12 border-b border-gray-700 pb-12">
                    
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-right">
                        <Logo color='footer' size='md'/>
                        <p className="mt-4 text-sm text-gray-400 max-w-xs">
                            نكرس جهودنا لنشر العلم الشرعي وتعزيز منهج السنة النبوية في المجتمع.
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

                {/* الحقوق */}
                <div className="mt-4 text-center text-lg text-gray-500">
                    <p>جمعية الهدى النبوي للسنة وعلومها – جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
