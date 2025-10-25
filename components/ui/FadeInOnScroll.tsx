

import React, { ReactNode } from 'react';
import { motion, Variants, Transition } from 'framer-motion';


interface FadeInOnScrollProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    amount?: number | "some" | "all"; 
}


const defaultVariants: Variants = {

    hidden: { opacity: 0, y: 40 }, 

    visible: { opacity: 1, y: 0 }, 
};

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
    children,
    duration = 0.8, 
    delay = 0,
    amount = 0.3, 
}) => {

    const transition: Transition = {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], 
    };

    return (
        <motion.div

            initial="hidden"
            
            whileInView="visible"
            
   
            variants={defaultVariants}
            transition={transition}
            
   
            viewport={{ 
                once: true, 
                amount: amount 
            }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInOnScroll;