// src/data/productsData.ts

export interface ProductItem {
    id: number;
    name: string;
    price: number[];
    stock: number; 
    category: string;
    imageUrl: string;
}

export const productsData: ProductItem[] = [
    { id: 1, name: 'طعام جاف للقطط (1 كجم)', price: [10, 50, 100], stock: 15, category: 'طعام', imageUrl: '/images/activties.jpeg' },
    { id: 3, name: 'لعبة الفأر التفاعلية', price: [10, 50, 100], stock: 40, category: 'ألعاب', imageUrl: '/images/activties.jpeg' },
    { id: 4, name: 'مجموعة العناية بالفرس', price: [10, 50, 100], stock: 5, category: 'عناية', imageUrl: '/images/activties.jpeg' },
    { id: 5, name: 'مقود للكلاب المتوسطة', price: [10, 50, 100], stock: 0, category: 'مستلزمات', imageUrl: '/images/activties.jpeg' }, // انتهى!
    { id: 6, name: 'فرشاة إزالة الشعر', price: [10, 50, 100], stock: 25, category: 'عناية', imageUrl: '/images/activties.jpeg' },
];

export const getStoreStats = (products: ProductItem[]) => {
    const totalProducts = products.length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const available = totalProducts - outOfStock;
    return { totalProducts, outOfStock, available };
};