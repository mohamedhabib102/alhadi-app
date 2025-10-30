
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
  { name: 'X / Twitter', href: 'https://x.com/alhadeannabwe', icon: 'BsTwitterX' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@alhadeannabwe', icon: 'FaTiktok' },
  { name: 'Snapchat', href: 'https://www.snapchat.com/add/alhadeannabwe', icon: 'FaSnapchat' },
];

