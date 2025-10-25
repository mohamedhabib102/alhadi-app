import Link from "next/link";


interface Color  {
    color: string;
    size: string
}

export default function Logo({color, size}: Color) {
    return <Link href="/" className={`logo_site 
        ${color === "footer" ? `text-white` : "text-black"}
        ${size === "md" ? "!text-3xl" : "text-[35px]"} mb-2.5 block
        `}
        > الهدى 
        </Link>
}