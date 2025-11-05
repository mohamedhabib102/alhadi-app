import Image from "next/image";
import Link from "next/link";

interface Color {
    color: string;
    size: string;
}

export default function Logo({ color, size }: Color) {
    return (
        <Link
            href="/"
            className={`
                logo_site 
                flex items-center justify-center
                ${color === "footer" ? "text-white" : "text-black"}
                mb-2.5 block
            `}
        >
            <div
                className={`
                    relative lg:h-16 h-14
                    ${size === "md" ? "w-28 md:w-32 lg:w-38" : "w-28 md:w-36 lg:w-40"} 
                    ${color === "footer" ? "brightness-150" : "brightness-150"}
                `}
                 
            >
                <Image
                    src="/icon.png"
                    alt="شعار الجمعية"
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    priority
                />
            </div>
        </Link>
    );
}
