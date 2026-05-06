"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  oldPrice?: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  laptops: "حواسيب محمولة",
  tvs: "شاشات وتلفزيونات",
  printers: "طابعات",
  cameras: "كاميرات",
  accessories: "إكسسوارات",
  home_devices: "أجهزة منزلية",
  air_conditioners: "مكيفات",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="w-10 h-10 border-4 border-[#1E90FF] border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || data.products || data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock < 1) return;
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

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.includes(searchQuery) || p.brand?.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#0A1A2F] via-[#0F3D5E]/5 to-[#f6fafe]">
        {/* Hero Banner */}
        <div className="bg-[#0A1A2F] py-10 sm:py-14 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-[#1E90FF]/10 to-transparent" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#1E90FF]/5 rounded-full blur-3xl" />
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">جميع المنتجات</h1>
            <p className="text-white/50 text-sm sm:text-base">اكتشف مجموعتنا المتنوعة من أحدث الأجهزة الإلكترونية</p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#1E90FF]/10 p-4 sm:p-5 mb-6 sm:mb-8 -mt-8 relative z-20">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#0A1A2F]/30 text-[20px]">search</span>
                <input
                  className="w-full bg-[#f6fafe] rounded-xl pr-10 pl-4 py-2.5 sm:py-3 text-sm border border-[#1E90FF]/10 focus:ring-2 focus:ring-[#1E90FF]/30 focus:border-[#1E90FF]/30 focus:outline-none placeholder:text-[#0A1A2F]/40 transition-all"
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0A1A2F]/60">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                <span className="hidden sm:inline">{filtered.length} منتج</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === "all"
                    ? "bg-[#0F3D5E] text-white shadow-md shadow-[#0F3D5E]/20"
                    : "bg-[#f6fafe] text-[#0A1A2F]/70 hover:bg-[#1E90FF]/10 border border-[#1E90FF]/10"
                }`}
              >
                الكل
              </button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === key
                      ? "bg-[#0F3D5E] text-white shadow-md shadow-[#0F3D5E]/20"
                      : "bg-[#f6fafe] text-[#0A1A2F]/70 hover:bg-[#1E90FF]/10 border border-[#1E90FF]/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-[#1E90FF] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-[#0A1A2F]/60">
              <span className="material-symbols-outlined text-5xl sm:text-6xl mb-4 block">inventory_2</span>
              <p className="text-base sm:text-lg">لا توجد منتجات</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map((product) => (
                <a
                  href={`/products/${product.slug}`}
                  key={product._id}
                  className="group relative flex bg-white rounded-2xl overflow-hidden border border-[#0A1A2F]/5 hover:border-[#1E90FF]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#0A1A2F]/5"
                >
                  {/* Colored accent bar */}
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#1E90FF] to-[#0F3D5E] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Image side */}
                  <div className="relative w-[120px] sm:w-[150px] md:w-[180px] shrink-0 bg-[#f8fbff] overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].startsWith("http") ? product.images[0] : `${API_URL}/uploads/${product.images[0]}`}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="material-symbols-outlined text-3xl text-[#0F3D5E]/20">image</span>
                      </div>
                    )}
                    {product.oldPrice && (
                      <span className="absolute top-2 left-2 bg-[#2ECC71] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Content side */}
                  <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] sm:text-[10px] text-[#1E90FF] font-semibold bg-[#1E90FF]/8 px-2 py-0.5 rounded-full">
                          {CATEGORY_LABELS[product.category] || product.category}
                        </span>
                        {product.isBestSeller && (
                          <span className="text-[9px] sm:text-[10px] text-[#1E90FF] font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">star</span>
                            مميز
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0A1A2F] line-clamp-2 leading-relaxed">
                        {product.name}
                      </h3>
                      {product.brand && (
                        <span className="text-[10px] text-[#0A1A2F]/40 mt-0.5 block">{product.brand}</span>
                      )}
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div>
                        <span className="text-base sm:text-lg font-bold text-[#0F3D5E]">{product.price.toLocaleString()} ر.س</span>
                        {product.oldPrice && (
                          <span className="block text-[10px] text-[#0A1A2F]/35 line-through">{product.oldPrice.toLocaleString()} ر.س</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {product.stock > 0 ? (
                          <span className="text-[9px] sm:text-[10px] text-[#2ECC71] bg-[#2ECC71]/10 px-2 py-0.5 rounded-full font-medium hidden sm:block">متوفر</span>
                        ) : (
                          <span className="text-[9px] sm:text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-medium hidden sm:block">نفذ</span>
                        )}
                        <button
                          onClick={(e) => handleAdd(e, product)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
                            addedId === product._id
                              ? "bg-[#2ECC71] text-white"
                              : "bg-[#0F3D5E]/10 text-[#0F3D5E] hover:bg-[#0F3D5E] hover:text-white"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                            {addedId === product._id ? "check" : "add_shopping_cart"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
