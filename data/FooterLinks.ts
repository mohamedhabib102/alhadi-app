
export interface FooterLink {
    name: string;
    href: string;
    icon?: string; 
}

export const companyLinks: FooterLink[] = [
    { name: 'من نحن', href: '/about' },
    { name: 'أهدافنا ورسالتنا', href: '/governance' },
    { name: 'السياسات واللوائح', href: '/governance' },
];


export const serviceLinks: FooterLink[] = [
    { name: 'تسجيل الدخول', href: '/login' },
    { name: 'سلة التبرعات', href: '/store/cart' },
    { name: ' التبرعات ', href: '/store' },
];


export const socialLinks: FooterLink[] = [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'FaInstagram' },
    { name: 'X / Twitter', href: 'https://x.com', icon: 'FaTwitter' },
    { name: 'TikTok', href: 'https://tiktok.com', icon: 'FaTiktok' },
    { name: 'Snapchat', href: 'https://snapchat.com', icon: 'FaSnapchat' },
];