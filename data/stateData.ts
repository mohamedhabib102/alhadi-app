// src/data/statsData.ts
import { FaUsers, FaGraduationCap, FaBone, FaHandHoldingHeart } from 'react-icons/fa';
import { StatItem } from '@/types/StateItem';

export const statsData: StatItem[] = [
    {
        id: 1,
        value: 1000,
        label: 'متطوع ساهم في أنشطة الجمعية',
        IconComponent: FaUsers,
        suffix: '',
    },
    {
        id: 2,
        value: 2000,
        label: 'محاضرة توعوية في المدارس والجامعات',
        IconComponent: FaGraduationCap,
        suffix: '',
    },
    {
        id: 3,
        value: 12000,
        label: 'وجبة طعام تم توزيعها',
        IconComponent: FaBone,
        suffix: '',
    },
    {
        id: 4,
        value: 2000,
        label: 'حيوان تم إنقاذهم وتقديم الرعاية لهم',
        IconComponent: FaHandHoldingHeart,
        suffix: '',
    },
];