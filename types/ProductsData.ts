export interface ProductItem {
  id: number;
  name: string;
  price: number[];
  stock: number;
  collected: number; 
  targetAmount: number; // الهدف
  remainingAmount: number; 
  endDate: string; // تاريخ انتهاء الحملة
  remainingDays: number; // المدة المتبقية
  imageUrl: string;
}
