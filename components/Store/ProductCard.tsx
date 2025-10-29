"use client"
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { ProductItem } from '@/types/ProductsData';
import FadeInOnScroll from '../ui/FadeInOnScroll';
import Image from 'next/image';

interface ProductCardProps {
    product: ProductItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [price, setPrice] = useState<number>(0)
    const isOutOfStock = product.stock === 0;

    return (
        <FadeInOnScroll>
            <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isOutOfStock ? 'opacity-50 grayscale' : 'hover:shadow-xl'}`}>
                {!isOutOfStock && (
                  <div className='absolute top-2 right-4 rounded-lg z-20 bg-[#eeeeeed7] text-[var(--main-color)] px-3 py-1.5 backdrop-blur-[2px]'>
                      <span> المدة المتبقية </span>
                      <span> {product.remainingDays} </span>
                      أيام
                  </div>

                )}
            {isOutOfStock && (
                <div className="absolute inset-0 bg-red-600/35 text-white flex items-center justify-center z-10">
                    <span className="text-2xl font-bold rotate-[-15deg]"> انتهت مدة المشروع </span>
                </div>
            )}


            <div className="h-48 flex items-center justify-center">
          
                <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={300}
                height={200}
                className="w-full max-w-full h-full object-cover" 
                />
            </div>

            <div className="p-4 flex flex-col items-end text-right">
                
                <div className="text-sm flex w-full justify-between flex-row-reverse">
                    <div className='text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-1'>
                       <span> تم جمع </span>
                       <span>{product.collected} </span>
                       ريال
                    </div>
                    <div className='text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-1'>
                      <span> المبلغ المتبقي </span>
                      <span>{product.targetAmount} </span>
                      ريال
                    </div>
                </div>
                
                
                <h3 className="text-[21px] font-bold text-gray-800 truncate w-full mb-2">
                    {product.name}
                </h3>


                   {!isOutOfStock && (
                      <div className="w-full flex justify-between items-center mt-2">
                          <button 
                              disabled={isOutOfStock}
                              className={`p-3 rounded-full transition cursor-pointer duration-300 ${isOutOfStock 
                                  ? 'bg-gray-400 cursor-not-allowed' 
                                  : 'bg-[var(--main-color)] hover:bg-blue-500 text-white'}`}
                              aria-label="Add to cart"
                          >
                              <FaShoppingCart className="text-lg" />
                          </button>
      
                          <button 
                              disabled={isOutOfStock}
                              className={`p-3 rounded-lg w-44 transition cursor-pointer duration-300 bg-[var(--main-color)]
                                   hover:bg-blue-500 text-white `}
                              aria-label="Add to cart"
                          >
                              تبرع الأن
                          </button>
                      </div>
                   )}
            </div>
        </div>
        </FadeInOnScroll>

    );
};

export default ProductCard;