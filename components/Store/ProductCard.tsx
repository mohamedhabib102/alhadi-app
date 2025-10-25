"use client"
import React, { useState } from 'react';
import { FaShoppingCart, FaShareAlt, FaTag } from 'react-icons/fa';
import { ProductItem } from '@/data/ProductsData';
import { FaMoneyBill } from 'react-icons/fa';
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
            
            {isOutOfStock && (
                <div className="absolute inset-0 bg-red-600/35 text-white flex items-center justify-center z-10">
                    <span className="text-2xl font-bold rotate-[-15deg]"> انتهت مدة المشروع </span>
                </div>
            )}


            <div className="h-48 bg-gray-200 flex items-center justify-center">
          
                <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={300}
                height={200}
                className="w-full max-w-full h-full object-cover" 
                />
            </div>

            <div className="p-4 flex flex-col items-end text-right">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-1">
                    {product.category}
                </span>
                
                <h3 className="text-lg font-bold text-gray-800 truncate w-full mb-2">
                    {product.name}
                </h3>
                   {!isOutOfStock && (
                      <div className='text-right mb-1.5 w-full'>
                          <span className='block mb-2 text-[var(--main-color)] font-medium
                          text-lg'> مبلغ التبرع </span>
                          <div className='flex flex-row-reverse justify-between items-center'>
                            <div className='flex items-center'>
                               {product.price.map((ele, index) => (
                                   <button key={index}
                                   onClick={() => setPrice(ele)}
                                   className={
                                    `p-2 m-1 border-2
                                   rounded-lg cursor-pointer
                                   ${price === ele ? "border-[var(--main-color)]" : "border-[#EEE]"}
                                   `
                                   }
                                   >{ele}</button>
                               ))}
                            </div>

                            <div className='lg:w-32 w-38 relative'>
                               <input 
                                type="text" 
                                name='price' 
                                defaultValue={price}
                                className='border-2 border-[#EEE] text-right 
                                  outline-none rounded-lg p-2 max-w-full'
                                />
                                <FaMoneyBill 
                                size={20}
                                className='absolute top-1/2 left-2 -translate-y-1/2'
                                />
                            </div>
                          </div>
                      </div>
                   )}

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