"use client";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[75vh] flex items-center justify-center px-4 bg-[#f6fafe]">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-[#0F3D5E]/5 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-6xl text-[#0F3D5E]/30">remove_shopping_cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1A2F] mb-3">سلتك فارغة!</h1>
            <p className="text-[#0A1A2F]/50 mb-8 max-w-sm mx-auto">يبدو أنك لم تضف أي منتجات بعد. تصفح منتجاتنا واختر ما يناسبك.</p>
            <a href="/products" className="inline-flex items-center gap-2 bg-[#1E90FF] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-[#1E90FF]/25 hover:-translate-y-0.5 transition-all">
              <span className="material-symbols-outlined">shopping_bag</span>
              ابدأ التسوق
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f6fafe] pb-24 lg:pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1A2F]">سلة التسوق</h1>
              <p className="text-sm text-[#0A1A2F]/50 mt-1">{totalItems} منتج</p>
            </div>
            <a href="/products" className="text-[#1E90FF] text-sm font-medium hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              متابعة التسوق
            </a>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Items List */}
            <div className="flex-1">
              {/* Table Header - Desktop */}
              <div className="hidden sm:grid grid-cols-[1fr_120px_140px_40px] gap-4 px-5 py-3 bg-[#0A1A2F] rounded-t-2xl text-white text-xs font-medium">
                <span>المنتج</span>
                <span className="text-center">الكمية</span>
                <span className="text-center">المجموع</span>
                <span></span>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-t-none overflow-hidden border border-[#0A1A2F]/5 sm:border-t-0 divide-y divide-[#0A1A2F]/5">
                {items.map((item) => (
                  <div key={item.productId} className="p-4 sm:p-5">
                    {/* Mobile Layout */}
                    <div className="sm:hidden">
                      <div className="flex gap-3">
                        <div className="w-24 h-24 rounded-2xl bg-[#f8fbff] border border-[#0A1A2F]/5 overflow-hidden shrink-0">
                          <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#0A1A2F] text-sm leading-snug line-clamp-2 mb-1">{item.name}</h3>
                          <p className="text-[#1E90FF] font-bold text-base">{item.price.toLocaleString()} ر.س</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="self-start text-[#0A1A2F]/25 hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#0A1A2F]/5">
                        <div className="flex items-center gap-1 bg-[#f6fafe] rounded-full border border-[#0A1A2F]/8">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1E90FF]/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1E90FF]/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                        <span className="font-bold text-[#0F3D5E] text-lg">{(item.price * item.quantity).toLocaleString()} ر.س</span>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:grid grid-cols-[1fr_120px_140px_40px] gap-4 items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-[#f8fbff] border border-[#0A1A2F]/5 overflow-hidden shrink-0">
                          <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#0A1A2F] text-sm leading-snug line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-[#0A1A2F]/40 mt-0.5">{item.price.toLocaleString()} ر.س / وحدة</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 bg-[#f6fafe] rounded-full border border-[#0A1A2F]/8 mx-auto">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1E90FF]/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="w-7 text-center font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1E90FF]/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <span className="font-bold text-[#0F3D5E] text-center text-lg">{(item.price * item.quantity).toLocaleString()} ر.س</span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0A1A2F]/25 hover:text-red-500 hover:bg-red-50 transition-all mx-auto"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[360px] shrink-0">
              <div className="bg-white rounded-2xl border border-[#0A1A2F]/5 sticky top-6 overflow-hidden">
                <div className="p-5 sm:p-6">
                  <h2 className="font-bold text-[#0A1A2F] text-lg mb-5">ملخص الطلب</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#0A1A2F]/50">المجموع الفرعي</span>
                      <span className="font-semibold text-[#0A1A2F]">{totalPrice.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0A1A2F]/50">الشحن</span>
                      <span className="font-semibold text-[#2ECC71]">مجاني</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#0A1A2F]/50">ضريبة القيمة المضافة (15%)</span>
                      <span className="font-semibold text-[#0A1A2F]">{Math.round(totalPrice * 0.15).toLocaleString()} ر.س</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t-2 border-dashed border-[#0A1A2F]/10">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0A1A2F] text-base">الإجمالي</span>
                      <span className="text-2xl sm:text-3xl font-bold text-[#0F3D5E]">{Math.round(totalPrice * 1.15).toLocaleString()} <span className="text-base">ر.س</span></span>
                    </div>
                  </div>

                  <a
                    href="/checkout"
                    className="mt-6 w-full bg-[#0F3D5E] text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#1E90FF] hover:shadow-xl hover:shadow-[#1E90FF]/20 transition-all block text-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    إتمام الطلب بأمان
                  </a>
                </div>

                {/* Trust Section */}
                <div className="bg-[#f6fafe] px-5 py-4 border-t border-[#0A1A2F]/5">
                  <div className="flex items-center justify-center gap-4 text-[#0A1A2F]/40">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      <span className="text-[10px]">دفع آمن</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                      <span className="text-[10px]">شحن مجاني</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span className="text-[10px]">منتجات أصلية</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#0A1A2F]/10 px-4 py-3 z-50 safe-area-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] text-[#0A1A2F]/40">الإجمالي شامل الضريبة</p>
            <span className="text-xl font-bold text-[#0F3D5E]">{Math.round(totalPrice * 1.15).toLocaleString()} ر.س</span>
          </div>
          <a
            href="/checkout"
            className="bg-[#0F3D5E] text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#1E90FF] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            إتمام الطلب
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
