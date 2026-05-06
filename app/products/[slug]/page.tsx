"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

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

function parseDescription(desc: string) {
  const sections: { title: string; items: string[] }[] = [];
  let currentTitle = "نبذة عامة";
  let currentItems: string[] = [];

  desc.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (trimmed.endsWith(":") && !trimmed.startsWith("-")) {
      if (currentItems.length) sections.push({ title: currentTitle, items: currentItems });
      currentTitle = trimmed.slice(0, -1);
      currentItems = [];
    } else if (trimmed.startsWith("-")) {
      currentItems.push(trimmed.slice(1).trim());
    } else {
      currentItems.push(trimmed);
    }
  });
  if (currentItems.length) sections.push({ title: currentTitle, items: currentItems });
  return sections;
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(0);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data || data.product || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;

  const handleAddToCart = () => {
    if (!product || product.stock < 1) return;
    addToCart(
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        stock: product.stock,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-[#1E90FF] border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="text-center py-32 text-[#0A1A2F]/60">
          <span className="material-symbols-outlined text-7xl mb-4 block">error</span>
          <p className="text-xl">المنتج غير موجود</p>
          <a href="/products" className="text-[#1E90FF] mt-4 inline-block hover:underline">العودة للمنتجات</a>
        </div>
        <Footer />
      </>
    );
  }

  const descSections = product.description ? parseDescription(product.description) : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#f6fafe] to-white">
        {/* Breadcrumb */}
        <div className="bg-[#0A1A2F]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/50">
              <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
              <span>/</span>
              <a href="/products" className="hover:text-white transition-colors">المنتجات</a>
              <span>/</span>
              <span className="text-white/80 truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Gallery - 3 cols */}
            <div className="lg:col-span-3 lg:sticky lg:top-6 lg:self-start">
              <div className="bg-white rounded-3xl border border-[#0A1A2F]/5 overflow-hidden">
                {/* Main Image */}
                <div className="relative aspect-[4/3] sm:aspect-square flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-[#f8fbff] to-white">
                  {product.oldPrice && (
                    <div className="absolute top-4 right-4 bg-[#2ECC71] text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl">
                      خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </div>
                  )}
                  {product.isBestSeller && (
                    <div className="absolute top-4 left-4 bg-[#1E90FF] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      الأكثر مبيعاً
                    </div>
                  )}
                  {product.images?.[activeImage] ? (
                    <img
                      src={getImageUrl(product.images[activeImage])}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-8xl text-[#0F3D5E]/15">image</span>
                  )}
                </div>
                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 p-3 sm:p-4 border-t border-[#0A1A2F]/5 overflow-x-auto">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#f8fbff] ${
                          activeImage === i ? "border-[#1E90FF] shadow-sm" : "border-transparent hover:border-[#1E90FF]/30"
                        }`}
                      >
                        <img src={getImageUrl(img)} alt="" className="w-full h-full object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info Panel - 2 cols */}
            <div className="lg:col-span-2 space-y-5">
              {/* Category & Brand */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] sm:text-xs font-semibold text-[#1E90FF] bg-[#1E90FF]/10 px-3 py-1 rounded-full">
                  {CATEGORY_LABELS[product.category] || product.category}
                </span>
                {product.brand && (
                  <span className="text-[11px] sm:text-xs font-medium text-[#0A1A2F]/50 bg-[#0A1A2F]/5 px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#0A1A2F] leading-snug">
                {product.name}
              </h1>

              {/* Price */}
              <div className="bg-gradient-to-l from-[#0F3D5E]/5 to-transparent rounded-2xl p-4 sm:p-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold text-[#0F3D5E]">{product.price.toLocaleString()}</span>
                  <span className="text-base sm:text-lg text-[#0F3D5E]/70 font-medium">ر.س</span>
                </div>
                {product.oldPrice && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-[#0A1A2F]/40 line-through">{product.oldPrice.toLocaleString()} ر.س</span>
                    <span className="text-xs font-bold text-[#2ECC71] bg-[#2ECC71]/10 px-2 py-0.5 rounded-md">
                      وفّر {(product.oldPrice - product.price).toLocaleString()} ر.س
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl ${
                product.stock > 0 ? "text-[#2ECC71] bg-[#2ECC71]/10" : "text-red-500 bg-red-50"
              }`}>
                <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-[#2ECC71] animate-pulse" : "bg-red-500"}`} />
                {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : "غير متوفر حالياً"}
              </div>

              {/* Quantity & Cart */}
              {product.stock > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#0A1A2F]/70">الكمية:</span>
                    <div className="flex items-center bg-[#f6fafe] rounded-xl border border-[#0A1A2F]/10">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#1E90FF]/10 rounded-r-xl transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-10 text-center font-bold text-base">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#1E90FF]/10 rounded-l-xl transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-4 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      added
                        ? "bg-[#2ECC71] text-white"
                        : "bg-[#0F3D5E] text-white hover:bg-[#1E90FF] hover:shadow-lg hover:shadow-[#1E90FF]/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {added ? "check_circle" : "shopping_cart"}
                    </span>
                    {added ? "تمت الإضافة بنجاح!" : "أضف للسلة"}
                  </button>

                  <div className="flex gap-2">
                    <button className="flex-1 py-3 rounded-xl border border-[#0A1A2F]/10 text-[#0A1A2F]/60 text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-all flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                      المفضلة
                    </button>
                    <button className="flex-1 py-3 rounded-xl border border-[#0A1A2F]/10 text-[#0A1A2F]/60 text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-all flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">share</span>
                      مشاركة
                    </button>
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#0A1A2F]/5">
                {[
                  { icon: "local_shipping", label: "توصيل سريع", sub: "2-4 أيام عمل" },
                  { icon: "verified_user", label: "ضمان أصلي", sub: "من المصنع" },
                  { icon: "autorenew", label: "إرجاع مجاني", sub: "خلال 7 أيام" },
                  { icon: "payments", label: "دفع عند الاستلام", sub: "متاح" },
                ].map((f) => (
                  <div key={f.icon} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f6fafe]">
                    <span className="material-symbols-outlined text-[#1E90FF] text-[20px]">{f.icon}</span>
                    <div>
                      <span className="text-[11px] sm:text-xs font-semibold text-[#0A1A2F] block">{f.label}</span>
                      <span className="text-[9px] sm:text-[10px] text-[#0A1A2F]/40">{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description Accordion */}
          {descSections.length > 0 && (
            <section className="mt-10 sm:mt-14">
              <h2 className="text-lg sm:text-xl font-bold text-[#0A1A2F] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#1E90FF] rounded-full" />
                تفاصيل المنتج
              </h2>
              <div className="space-y-2">
                {descSections.map((section, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#0A1A2F]/5 overflow-hidden">
                    <button
                      onClick={() => setOpenSection(openSection === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-right hover:bg-[#f6fafe] transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#0A1A2F]">{section.title}</span>
                      <span className={`material-symbols-outlined text-[#1E90FF] text-[20px] transition-transform duration-200 ${openSection === i ? "rotate-180" : ""}`}>
                        expand_more
                      </span>
                    </button>
                    {openSection === i && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-[#0A1A2F]/5">
                        <ul className="space-y-2 pt-3">
                          {section.items.map((item, j) => (
                            <li key={j} className="text-xs sm:text-sm text-[#0A1A2F]/70 leading-relaxed flex items-start gap-2">
                              <span className="material-symbols-outlined text-[#1E90FF] text-[14px] mt-0.5 shrink-0">check</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      {product.stock > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#0A1A2F]/10 p-3 z-50 flex items-center gap-3">
          <div className="flex-1">
            <span className="text-lg font-bold text-[#0F3D5E]">{product.price.toLocaleString()} ر.س</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              added ? "bg-[#2ECC71] text-white" : "bg-[#0F3D5E] text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {added ? "check" : "add_shopping_cart"}
            </span>
            {added ? "تمت!" : "أضف للسلة"}
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
