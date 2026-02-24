'use client'

import Logo from "@/components/ui/Logo";
import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Header() {
  const pathName = usePathname();
  const [toggle, setToggle] = useState<boolean>(false);
  const [storeOpen, setStoreOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const {user, logout} = useAuth();

  const handelToggle = () => {
    setToggle(!toggle);
    setStoreOpen(false);
  };


  const restToggles = () => {
    setToggle(false);
    setStoreOpen(false);
  }


  useEffect(() => {
    const handelClickOutside = (event: MouseEvent) => {
        if (headerRef.current && !headerRef.current?.contains(event.target as Node)){
            restToggles()
        }
    }

    document.addEventListener("click", handelClickOutside);

    return () => {document.removeEventListener("click", handelClickOutside)}
  }, [])
  

  return (
    <header 
    dir="ltr"
    ref={headerRef} className="bg-[#272f51] relative z-50">
      <div className="container mx-auto px-3.5">
        <nav className="flex items-center justify-between py-3 relative">
          <Logo color="header" size="lg" />

          {/* Button List   */}
          <button
            onClick={handelToggle}
            className="w-10 h-5 relative cursor-pointer lg:hidden block"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute bg-[var(--main-color)] w-full h-1 left-0 transition-all ${
                toggle ? "rotate-45 top-2" : "rotate-0 top-0"
              }`}
            ></span>
            <span
              className={`absolute bg-[var(--main-color)] w-full h-1 left-0 top-2 transition-all ${
                toggle ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute bg-[var(--main-color)] w-full h-1 left-0 transition-all ${
                toggle ? "-rotate-45 top-2" : "rotate-0 top-4"
              }`}
            ></span>
          </button>

          {/* Desktop Show  */}
          <ul className="hidden lg:flex items-center gap-2 text-right">
            <li><Link 
               onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            href="/contact" 
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/contact" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}>تواصل معنا</Link></li>
              {user.role === "Admin" && (
              <li>
                <Link
                onClick={()  => {
                setToggle(false);
                setStoreOpen(false);
                }}
                href="/dashboard" 
                className={
                  ` transition block px-4 py-2
                  ${pathName === "/dashboard" 
                    || pathName === "/dashboard/sections"
                    || pathName === "/dashboard/settings" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
                  `
                }>
                  لوحة التحكم
                </Link>
              </li>
              )}
            <li><Link
               onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
             href="/posts" 
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/posts" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}> المنشورات </Link></li>
            <li><Link
               onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
             href="/general-assembly" 
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/general-assembly" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}> الجمعية العمومية </Link></li>

            {/* Dropdown Store */}
            <li className="relative">
              <button
                onClick={() => {
                  setStoreOpen(!storeOpen);
                }}
                className={`${storeOpen ? "!text-[var(--main-color)]" : ""} flex items-center gap-1 text-[19px] cursor-pointer transition hover:!text-[var(--main-color)] py-2 px-2`}
              >
                المتجر الإلكتروني
                <IoIosArrowDown
                  size={18}
                  className={`transition-transform ${storeOpen ? "rotate-180" : ""}`}
                />
              </button>
              {storeOpen && (
                <ul className="absolute right-0 overflow-hidden bg-[#272f51] border border-gray-200 rounded-lg shadow-md mt-2 w-48 text-right">
                  <li>
                    <Link 
                    onClick={()  => setStoreOpen(false)}
                    href="/store" 
                    className={
                      ` transition block px-4 py-2 hover:bg-[#2b3664]
                      ${pathName === "/store" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
                      `
                    }>
                      التبرعات
                    </Link>
                  </li>
                  <li>
                    <Link
                    onClick={()  => setStoreOpen(false)}
                    href="/store/cart" 
                    className={
                      ` transition block px-4 py-2 hover:bg-[#2b3664]
                      ${pathName === "/store/cart" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
                      `
                    }>
                      سلة المشتريات
                    </Link>
                  </li>
                  <li>
                    {user.id ? (
                    <button 
                    onClick={()  => logout("/")}
                    className={
                      ` transition block w-full text-right px-4 py-2 hover:bg-[#2b3664]
                      hover:!text-[var(--main-color)]
                      `
                    }>
                      تسجيل الخروج
                    </button>
                    ) : (
                        <Link 
                    onClick={()  => setStoreOpen(false)}
                    href="/store/login" 
                    className={
                      ` transition block px-4 py-2 hover:bg-[#2b3664]
                      ${pathName === "/store/login" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
                      `
                    }>
                      تسجيل الدخول
                    </Link>
                    )}
                  </li>
                </ul>
              )}
            </li>

            <li><Link 
               onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            href="/governance" 
           className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/governance" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}> بيانات الحوكمة </Link></li>

            <li><Link 
                onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            href="/electronic-services" 
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/electronic-services" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}>  الخدمات الالكترونيه </Link></li>

            <li>
            <Link
              href="/about"
              className={
                `${pathName === "/about" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"} transition block text-lg`
              }
              onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            >
              من نحن
            </Link>
          </li>

            <li><Link href="/" 
             onClick={() => {
                  setStoreOpen(false);
             }}
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}>الرئيسية</Link></li>
          </ul>
        </nav>
      </div>

      { /*   Mobile show  */ }
      <div
        className={`lg:hidden absolute left-0 w-full bg-[#272f51] border-t border-gray-200 shadow-md transition-all duration-300 ${
          toggle ? "top-full opacity-100 visible" : "top-0 opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col text-right p-4 space-y-3">
          <li>
            <Link
              href="/"
              className={
                `${pathName === "/" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"} transition block text-lg`
              }
              onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            >
              الرئيسية
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className={
                `${pathName === "/about" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"} transition block text-lg`
              }
              onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            >
              من نحن
            </Link>
          </li>


         {/* Store */}
          <li>
            <button
              onClick={() => {
                setStoreOpen(!storeOpen);
              }}
              className={`flex flex-row-reverse cursor-pointer items-center justify-between w-full text-lg transition-colors 
                ${storeOpen ? "!text-[var(--main-color)]" : "text-black"} hover:!text-[var(--main-color)]`}
            >
              المتجر الإلكتروني
              <IoIosArrowDown
                size={18}
                className={`transition-transform ${storeOpen ? "rotate-180" : ""}`}
              />
            </button>
          
            {storeOpen && (
              <ul className="mt-2 bg-[#272f51] rounded-md border border-gray-200 overflow-hidden">
                <li>
                  <Link
                    href="/store"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-[#2b3664]
                      ${pathName === "/store" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setStoreOpen(false)
                    }}
                  >
                    التبرعات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store/cart"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-[#2b3664]
                      ${pathName === "/store/cart" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setStoreOpen(false)
                    }}
                  >
                    سلة المشتريات
                  </Link>
                    {user.id ? (
                    <button 
                    onClick={()  => logout("/")}
                    className={
                      ` transition block w-full text-right px-4 py-2 hover:bg-[#2b3664]
                      hover:!text-[var(--main-color)]
                      `
                    }>
                      تسجيل الخروج
                    </button>
                    ) : (
                        <Link 
                    onClick={()  => setStoreOpen(false)}
                    href="/store/login" 
                    className={
                      ` transition block px-4 py-2 hover:bg-[#2b3664]
                      ${pathName === "/store/login" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
                      `
                    }>
                      تسجيل الدخول
                    </Link>
                    )}
                </li>
              </ul>
            )}
          </li>
          
          { /* الحوكمة */}
            <li><Link 
              onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            href="/governance" 
            className={`
            text-[19px] cursor-pointer transition py-2
            ${pathName === "/governance" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}> بيانات الحوكمة </Link></li>

            <li><Link 
              onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
            href="/electronic-services" 
            className={`
            text-[19px] cursor-pointer transition py-2
            ${pathName === "/electronic-services" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}>  الخدمات الالكترونيه </Link></li>
          
           <li><Link 
                onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
           
           href="/general-assembly" 
            className={`
            text-[19px] cursor-pointer transition py-2 
            ${pathName === "/general-assembly" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            `}> الجمعية العمومية </Link></li>

          <li><Link 
                onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}
          href="/posts" 
          className={
            `
            ${pathName === "/posts" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            transition block text-lg`
          }> المنشورات </Link></li>

            {user.role === "Admin" && (
              <li>
                <Link
                onClick={()  => {
                setToggle(false);
                setStoreOpen(false);
                }}
                href="/dashboard" 
                className={
            `
           ${
                    pathName === "/dashboard"
                    || pathName === "/dashboard/sections"
                    || pathName === "/dashboard/settings" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            transition block text-lg`
          }>
                  لوحة التحكم
                </Link>
              </li>
              )}
           
          <li><Link href="/contact" 
           className={
            `
            ${pathName === "/contact" ? "!text-[var(--main-color)]" : "hover:!text-[var(--main-color)]"}
            transition block text-lg`
          }
              onClick={() => {
                setToggle(false);
                setStoreOpen(false);
              }}>تواصل معنا</Link></li>
        </ul>
      </div>
    </header>
  );
}
