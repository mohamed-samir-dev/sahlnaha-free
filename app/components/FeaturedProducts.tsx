"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  stock: number;
  images: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/api/products?sort=newest&limit=4`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(() => {});
  }, []);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      stock: product.stock,
    });
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section dir="rtl" className="py-10 sm:py-14 md:py-20 bg-[#f0f7ff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 sm:mb-8 md:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-[32px] md:leading-[40px] font-semibold text-[#0F3D5E]">منتجاتنا المختارة</h2>
            <p className="text-sm text-[#0F3D5E]/60 mt-1">أحدث المنتجات المتوفرة لدينا</p>
          </div>
          <a className="text-[#1E90FF] text-sm sm:text-base hover:underline flex items-center gap-1 font-medium" href="/products">
            عرض الكل
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {products.map((product) => (
            <a href={`/products/${product.slug}`} key={product._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#1E90FF]/20 flex flex-col">
              <div className="relative h-36 sm:h-44 md:h-52 bg-gradient-to-b from-[#f8fbff] to-white overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    className="w-full h-full object-contain p-4 sm:p-5 group-hover:scale-105 transition-transform duration-500"
                    alt={product.name}
                    src={product.images[0].startsWith("http") ? product.images[0] : `${API_URL}/uploads/${product.images[0]}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="material-symbols-outlined text-4xl text-[#0F3D5E]/30">image</span>
                  </div>
                )}
                {product.oldPrice && (
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#2ECC71] text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-lg font-bold">
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                )}
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="text-[#0A1A2F] font-semibold text-xs sm:text-sm md:text-base mb-2 sm:mb-3 line-clamp-2">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[#1E90FF] font-bold text-sm sm:text-lg md:text-xl">{product.price.toLocaleString()} ر.س</span>
                    {product.oldPrice && (
                      <span className="text-[#0A1A2F]/40 text-xs line-through">{product.oldPrice.toLocaleString()} ر.س</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAdd(e, product)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0F3D5E] text-white flex items-center justify-center hover:bg-[#1E90FF] transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-sm sm:text-base">
                      {addedId === product._id ? "check" : "add_shopping_cart"}
                    </span>
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
