
export interface FooterLink {
    name: string;
    href: string;
    icon?: string; 
}


// 1. روابط الجمعية الرئيسية (Company Links)
// تستخدم الواجهة FooterLink
export const companyLinks: FooterLink[] = [
    { name: 'من نحن', href: '/about' },
    { name: 'أهدافنا ورسالتنا', href: '/mission' },
    { name: 'الفعاليات والمبادرات', href: '/activities' },
    { name: 'بوابة المستفيدين', href: '/beneficiaries' },
    { name: 'السياسات واللوائح', href: '/policies' },
    { name: 'موقع الجمعية (الرئيسي)', href: 'https://original-site.com' },
];

// 2. روابط التجارة والخدمات (E-commerce/Services Links)
// تستخدم الواجهة FooterLink
export const serviceLinks: FooterLink[] = [
    { name: 'المتجر الإلكتروني', href: '/store' },
    { name: 'تسجيل الدخول', href: '/login' },
    { name: 'سلة المشتريات', href: '/cart' },
    { name: 'التبرعات والدعم', href: '/donate' },
];

// 3. روابط التواصل الاجتماعي (Social Media Icons)
// تستخدم الواجهة FooterLink وتتطلب وجود خاصية icon
export const socialLinks: FooterLink[] = [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'FaInstagram' },
    { name: 'X / Twitter', href: 'https://x.com', icon: 'FaTwitter' },
    { name: 'TikTok', href: 'https://tiktok.com', icon: 'FaTiktok' },
    { name: 'Snapchat', href: 'https://snapchat.com', icon: 'FaSnapchat' },
];