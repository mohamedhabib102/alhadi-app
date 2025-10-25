'use client'

import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Header() {
  const pathName = usePathname();
  const [toggle, setToggle] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [storeOpen, setStoreOpen] = useState<boolean>(false);
  const [governanceOpen, setGovernanceOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handelToggle = () => {
    setToggle(!toggle);
    setAboutOpen(false);
    setStoreOpen(false);
    setGovernanceOpen(false)
  };


  const restToggles = () => {
    setToggle(false);
    setAboutOpen(false);
    setStoreOpen(false);
    setGovernanceOpen(false)
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
    <header ref={headerRef} className="border-b border-b-[#EEE] bg-white relative z-50">
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
              className={`absolute bg-black w-full h-1 left-0 transition-all ${
                toggle ? "rotate-45 top-2" : "rotate-0 top-0"
              }`}
            ></span>
            <span
              className={`absolute bg-black w-full h-1 left-0 top-2 transition-all ${
                toggle ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute bg-black w-full h-1 left-0 transition-all ${
                toggle ? "-rotate-45 top-2" : "rotate-0 top-4"
              }`}
            ></span>
          </button>

          {/* Desktop Show  */}
          <ul className="hidden lg:flex items-center gap-6 text-right">
            <li><Link href="/contact" 
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/contact" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
            `}>تواصل معنا</Link></li>
            <li><Link href="/media" 
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/media" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
            `}>المركز الإعلامي</Link></li>
            <li><Link href="/volunteers" 
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/volunteers" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
            `}>بوابة المتطوعين</Link></li>

            {/* Dropdown Store */}
            <li className="relative">
              <button
                onClick={() => {
                  setStoreOpen(!storeOpen);
                  setAboutOpen(false);
                  setGovernanceOpen(false)
                }}
                className={`${storeOpen ? "text-[var(--main-color)]" : ""} flex items-center gap-1 text-[19px] cursor-pointer transition hover:text-[var(--main-color)] py-2 px-2`}
              >
                المتجر الإلكتروني
                <IoIosArrowDown
                  size={18}
                  className={`transition-transform ${storeOpen ? "rotate-180" : ""}`}
                />
              </button>
              {storeOpen && (
                <ul className="absolute right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 w-48 text-right">
                  <li>
                    <Link 
                    onClick={()  => setStoreOpen(false)}
                    href="/store" 
                    className={
                      ` transition block px-4 py-2 hover:bg-gray-200
                      ${pathName === "/store" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }>
                      المنتجات
                    </Link>
                  </li>
                  <li>
                    <Link
                    onClick={()  => setStoreOpen(false)}
                    href="/store/cart" 
                    className={
                      ` transition block px-4 py-2 hover:bg-gray-200
                      ${pathName === "/store/cart" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }>
                      سلة المشتريات
                    </Link>
                  </li>
                  <li>
                    <Link 
                    onClick={()  => setStoreOpen(false)}
                    href="/store/login" 
                    className={
                      ` transition block px-4 py-2 hover:bg-gray-200
                      ${pathName === "/store/login" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }>
                      تسجيل الدخول
                    </Link>
                  </li>
                </ul>
              )}
            </li>


            <li className="relative">
              <button
                onClick={() => {
                  setGovernanceOpen(!governanceOpen);
                  setAboutOpen(false);
                  setStoreOpen(false);
                }}
                className={`${governanceOpen ? "text-[var(--main-color)]" : ""} flex items-center gap-1 text-[19px] cursor-pointer transition hover:text-[var(--main-color)] py-2 px-2`}
              >
                الحوكمة{" "}
                <IoIosArrowDown
                  size={18}
                  className={`transition-transform ${governanceOpen ? "rotate-180" : ""}`}
                />
              </button>
              {governanceOpen && (
                <ul className="absolute right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 w-56 text-right">
                  <li><Link 
                  onClick={() => setGovernanceOpen(false)}
                  href="/governance" className={
                      `${pathName === "/governance" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"} transition block px-4 py-2 hover:bg-gray-200`
                    }>نظرة عامة</Link></li>
                  <li><Link 
                  onClick={() => setGovernanceOpen(false)}
                  href="/governance/policies" className={
                      `${pathName === "/governance/policies" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"} transition block px-4 py-2 hover:bg-gray-200`
                    }>السياسات واللوائح</Link></li>
                </ul>
              )}
            </li>


            {/* Dropdown (من نحن) */}
            <li className="relative">
              <button
                onClick={() => {
                  setAboutOpen(!aboutOpen);
                  setStoreOpen(false);
                  setGovernanceOpen(false)
                }}
                className={`${aboutOpen ? "text-[var(--main-color)]" : ""}
                flex items-center gap-1 text-[19px] cursor-pointer transition hover:text-[var(--main-color)] py-2 px-2`}
              >
                من نحن{" "}
                <IoIosArrowDown
                  size={18}
                  className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>

              {aboutOpen && (
                <ul className="absolute right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 w-48 text-right">
                  <li>
                    <Link
                    onClick={() => setAboutOpen(false)} 
                    href="/about" className={
                      `${pathName === "/about" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"} transition block px-4 py-2 hover:bg-gray-200`
                    }>
                      عن الجمعية
                    </Link>
                  </li>
                  <li>
                    <Link
                    onClick={() => setAboutOpen(false)} 
                    href="/about/vision" className={
                      `${pathName === "/about/vision" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"} transition block px-4 py-2 hover:bg-gray-200`
                    }>
                      الرؤية والرسالة
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li><Link href="/" 
             onClick={() => {
                  setAboutOpen(false);
                  setStoreOpen(false);
                  setGovernanceOpen(false)
             }}
            className={`
            text-[19px] cursor-pointer transition py-2 px-2
            ${pathName === "/" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
            `}>الرئيسية</Link></li>
          </ul>
        </nav>
      </div>

      { /*   Mobile show  */ }
      <div
        className={`lg:hidden absolute left-0 w-full bg-white border-t border-gray-200 shadow-md transition-all duration-300 ${
          toggle ? "top-full opacity-100 visible" : "top-0 opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col text-right p-4 space-y-3 bg-[var(--sub-color)]">
          <li>
            <Link
              href="/"
              className={
                `${pathName === "/" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"} transition block text-lg`
              }
              onClick={() => {
                setToggle(false);
                setAboutOpen(false);
                setStoreOpen(false);
                setGovernanceOpen(false)
              }}
            >
              الرئيسية
            </Link>
          </li>

          { /* About  */}
          <li>
            <button
              onClick={() => {
                setAboutOpen(!aboutOpen);
                setStoreOpen(false);
                setGovernanceOpen(false);
              }}
              className={`flex flex-row-reverse cursor-pointer items-center justify-between w-full text-lg transition-colors 
                ${aboutOpen ? "text-[var(--main-color)]" : "text-black"} 
                `}
            >
              من نحن
              <IoIosArrowDown
                size={18}
                className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}
              />
            </button>
          
            {aboutOpen && (
              <ul className="mt-2 bg-gray-50 rounded-md border border-gray-200">
                <li>
                  <Link
                    href="/about"
                    className={
                      `block px-4 py-2 text-base hover:bg-gray-100
                      ${pathName === "/about" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setAboutOpen(false)
                    }}
                  >
                    عن الجمعية
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/vision"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-gray-100
                      ${pathName === "/about/vision" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setAboutOpen(false)
                    }}
                  >
                    الرؤية والرسالة
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          {/* Store  */}
          <li>
            <button
              onClick={() => {
                setStoreOpen(!storeOpen);
                setAboutOpen(false);
                setGovernanceOpen(false);
              }}
              className={`flex flex-row-reverse cursor-pointer items-center justify-between w-full text-lg transition-colors 
                ${storeOpen ? "text-[var(--main-color)]" : "text-black"} hover:text-[var(--main-color)]`}
            >
              المتجر الإلكتروني
              <IoIosArrowDown
                size={18}
                className={`transition-transform ${storeOpen ? "rotate-180" : ""}`}
              />
            </button>
          
            {storeOpen && (
              <ul className="mt-2 bg-gray-50 rounded-md border border-gray-200">
                <li>
                  <Link
                    href="/store"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-gray-100
                      ${pathName === "/store" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setStoreOpen(false)
                    }}
                  >
                    المنتجات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store/cart"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-gray-100
                      ${pathName === "/store/cart" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setStoreOpen(false)
                    }}
                  >
                    سلة المشتريات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store/login"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-gray-100
                      ${pathName === "/store/login" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setStoreOpen(false)
                    }}
                  >
                    تسجيل الدخول
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          { /* الحوكمة */}
          <li>
            <button
              onClick={() => {
                setGovernanceOpen(!governanceOpen);
                setAboutOpen(false);
                setStoreOpen(false);
              }}
              className={`flex flex-row-reverse cursor-pointer items-center justify-between w-full text-lg transition-colors 
                ${governanceOpen ? "text-[var(--main-color)]" : "text-black"} hover:text-[var(--main-color)]`}
            >
              الحوكمة{" "}
              <IoIosArrowDown
                size={18}
                className={`transition-transform ${governanceOpen ? "rotate-180" : ""}`}
              />
            </button>
          
            {governanceOpen && (
              <ul className="mt-2 bg-gray-50 rounded-md border border-gray-200">
                <li>
                  <Link
                    href="/governance"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-gray-100
                      ${pathName === "/governance" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setGovernanceOpen(false)
                    }}
                  >
                    نظرة عامة
                  </Link>
                </li>
                <li>
                  <Link
                    href="/governance/policies"
                    className={
                      `
                      block px-4 py-2 text-base hover:bg-gray-100
                      ${pathName === "/governance/policies" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
                      `
                    }
                    onClick={() => {
                      setToggle(false)
                      setGovernanceOpen(false)
                    }}

                  >
                    السياسات واللوائح
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li><Link href="/volunteers" 
          className={
            `
            ${pathName === "/volunteers" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
            transition block text-lg`
          } 
          onClick={() => setToggle(false)}>بوابة المتطوعين</Link></li>
          <li><Link href="/media" 
          className={
            `
            ${pathName === "/media" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
            transition block text-lg`
          }
           onClick={() => setToggle(false)}>المركز الإعلامي</Link></li>
          <li><Link href="/contact" 
           className={
            `
            ${pathName === "/contact" ? "text-[var(--main-color)]" : "hover:text-[var(--main-color)]"}
            transition block text-lg`
          }
           onClick={() => setToggle(false)}>تواصل معنا</Link></li>
        </ul>
      </div>
    </header>
  );
}
