"use client"
import FadeInOnScroll from "./FadeInOnScroll"



type Header ={
    title: string;
    description: string
}


interface Data  {
    content: Header
}


const CustomHeader: React.FC<Data> = ({content}) => {
    return (
        <div>
           <FadeInOnScroll duration={0.8}>
               <h2 className="text-[var(--main-color)] font-bold mb-3 text-right">
                   {content.title}
               </h2>
           </FadeInOnScroll>
           <FadeInOnScroll duration={0.8} delay={0.2}>
               <p className="lg:w-[700px] font-bold lg:text-2xl text-lg mb-12 ml-auto leading-10 text-right">
                  {content.description}
               </p>
           </FadeInOnScroll>
        </div>
    )
}

export default CustomHeader;