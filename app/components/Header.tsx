"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="bg-[#0A1A2F] backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[#1E90FF]/20">
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto h-16">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.webp" alt="سهلناها" width={72} height={72} className="rounded-lg" />
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {[
            { href: "/", label: "الرئيسية" },
            { href: "/products", label: "المنتجات" },
            { href: "/about", label: "من نحن" },
            { href: "/contact", label: "تواصل معنا" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors pb-0.5 ${
                pathname === href
                  ? "text-[#1E90FF] font-semibold border-b-2 border-[#1E90FF]"
                  : "text-white/80 hover:text-[#1E90FF] hover:border-b-2 hover:border-[#1E90FF]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 hover:bg-[#1E90FF]/10 rounded-full transition-all">
            <span className="material-symbols-outlined text-[#1E90FF]">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2ECC71] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-[#1E90FF]/10 rounded-full transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <span className="material-symbols-outlined text-white">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0A1A2F] border-t border-[#1E90FF]/20 px-4 py-4 flex flex-col gap-4">
          <div className="relative">
            <input
              className="bg-[#0F3D5E] rounded-full px-4 py-2 w-full text-sm text-white focus:ring-2 focus:ring-[#1E90FF]/40 focus:outline-none placeholder:text-white/50 border border-[#1E90FF]/30"
              placeholder="بحث عن منتج..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-2 text-white/50 text-[20px]">search</span>
          </div>
          {[
            { href: "/", label: "الرئيسية" },
            { href: "/products", label: "المنتجات" },
            { href: "/about", label: "من نحن" },
            { href: "/contact", label: "تواصل معنا" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm ${pathname === href ? "text-[#1E90FF] font-semibold" : "text-white/80"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
