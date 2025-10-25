
export interface ActivityItem {
    id: number;
    title: string;
    description: string; 
    imageSrc: string;  
    link: string;
}

export const activitiesData: ActivityItem[] = [
    {
        id: 1,
        title: 'اليوم العالمي للحيوان',
        description: 'احتفالية سنوية لتسليط الضوء على حقوق الحيوانات وأهمية الرفق بها.',
        imageSrc: "images/activties.jpeg",
        link: '/activities/global-animal-day',
    },
    {
        id: 2,
        title: 'مهرجان الزيتون 2025',
        description: 'مشاركة توعوية لربط التراث بالبيئة وإبراز دور الحيوانات في التوازن البيئي.',
        imageSrc: "images/activties.jpeg",
        link: '/activities/olive-festival',
    },
    {
        id: 3,
        title: 'شنط إسعاف بيطرية',
        description: 'مبادرة لتوفير حقائب إسعافات أولية لمتطوعي الرعاية الطارئة للحيوانات.',
        imageSrc: "images/activties.jpeg",
        link: '/activities/first-aid-kits',
    },
    {
        id: 4,
        title: 'مبادرة إطعام القطط',
        description: 'حملة مستمرة لتوفير الغذاء والرعاية الأساسية للقطط الضالة في الأحياء.',
        imageSrc: "images/activties.jpeg",
        link: '/activities/cat-feeding',
    },
];