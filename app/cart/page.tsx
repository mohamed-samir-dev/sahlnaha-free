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
        <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#0A1A2F] to-[#f6fafe]">
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md w-full shadow-xl shadow-[#0A1A2F]/5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1E90FF]/10 flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#1E90FF]">shopping_cart</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0A1A2F] mb-2">السلة فارغة</h1>
            <p className="text-sm sm:text-base text-[#0A1A2F]/50 mb-6">لم تقم بإضافة أي منتجات بعد، ابدأ التسوق الآن!</p>
            <a href="/products" className="inline-flex items-center gap-2 bg-[#0F3D5E] text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-[#1E90FF] hover:shadow-lg hover:shadow-[#1E90FF]/20 transition-all">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              تصفح المنتجات
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
      <main className="min-h-screen bg-[#f6fafe]">
        {/* Header Section */}
        <div className="bg-[#0A1A2F] pb-16 sm:pb-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">سلة التسوق</h1>
            {/* Steps */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1E90FF] text-white text-xs sm:text-sm font-bold flex items-center justify-center">1</span>
                <span className="text-xs sm:text-sm text-white font-medium">السلة</span>
              </div>
              <div className="flex-1 h-[2px] bg-white/20 max-w-[60px] sm:max-w-[80px]" />
              <div className="flex items-center gap-1.5">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 text-white/50 text-xs sm:text-sm font-bold flex items-center justify-center">2</span>
                <span className="text-xs sm:text-sm text-white/50">الدفع</span>
              </div>
              <div className="flex-1 h-[2px] bg-white/20 max-w-[60px] sm:max-w-[80px]" />
              <div className="flex items-center gap-1.5">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 text-white/50 text-xs sm:text-sm font-bold flex items-center justify-center">3</span>
                <span className="text-xs sm:text-sm text-white/50">التأكيد</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 pb-8 sm:pb-12">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
            {/* Cart Items */}
            <div className="flex-1 space-y-3">
              {/* Items count badge */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#0A1A2F]/5 flex items-center justify-between">
                <span className="text-sm font-medium text-[#0A1A2F]/70">{totalItems} منتج في السلة</span>
                <span className="text-xs text-[#1E90FF] font-medium">يمكنك تعديل الكميات</span>
              </div>

              {items.map((item) => (
                <div key={item.productId} className="bg-white rounded-2xl border border-[#0A1A2F]/5 overflow-hidden hover:shadow-md hover:shadow-[#0A1A2F]/3 transition-all">
                  <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#f8fbff] border border-[#0A1A2F]/5 overflow-hidden shrink-0">
                      <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-[#0A1A2F] text-sm sm:text-base line-clamp-2 leading-snug">{item.name}</h3>
                        <p className="text-xs text-[#0A1A2F]/40 mt-1">سعر الوحدة: {item.price.toLocaleString()} ر.س</p>
                      </div>

                      <div className="flex items-center justify-between mt-2 sm:mt-0">
                        {/* Quantity */}
                        <div className="flex items-center bg-[#f6fafe] rounded-xl overflow-hidden border border-[#0A1A2F]/5">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-[#1E90FF]/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">remove</span>
                          </button>
                          <span className="w-8 sm:w-10 text-center font-bold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-[#1E90FF]/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">add</span>
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-bold text-[#0F3D5E] text-sm sm:text-base">{(item.price * item.quantity).toLocaleString()} ر.س</span>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="self-start w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-[#0A1A2F]/30 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">close</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <a href="/products" className="flex items-center justify-center gap-2 text-sm text-[#1E90FF] font-medium py-3 hover:underline">
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                متابعة التسوق
              </a>
            </div>

            {/* Summary Sidebar */}
            <div className="w-full lg:w-[340px] shrink-0">
              <div className="bg-white rounded-2xl border border-[#0A1A2F]/5 overflow-hidden sticky top-6">
                <div className="bg-gradient-to-l from-[#0F3D5E] to-[#0A1A2F] p-4 sm:p-5">
                  <h2 className="font-bold text-white text-base sm:text-lg">ملخص الطلب</h2>
                </div>
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0A1A2F]/60">المجموع الفرعي ({totalItems} منتج)</span>
                    <span className="font-medium text-[#0A1A2F]">{totalPrice.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0A1A2F]/60">التوصيل</span>
                    <span className="font-medium text-[#2ECC71]">مجاني</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0A1A2F]/60">الضريبة (15%)</span>
                    <span className="font-medium text-[#0A1A2F]">{(totalPrice * 0.15).toLocaleString()} ر.س</span>
                  </div>
                  <div className="border-t border-[#0A1A2F]/10 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[#0A1A2F]">الإجمالي</span>
                      <div className="text-left">
                        <span className="text-xl sm:text-2xl font-bold text-[#0F3D5E]">{(totalPrice * 1.15).toLocaleString()}</span>
                        <span className="text-sm text-[#0F3D5E]/70 mr-1">ر.س</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#0A1A2F]/40 mt-1">شامل ضريبة القيمة المضافة</p>
                  </div>

                  <a
                    href="/checkout"
                    className="block w-full bg-[#0F3D5E] text-white py-3.5 sm:py-4 rounded-2xl font-bold text-center text-sm sm:text-base hover:bg-[#1E90FF] hover:shadow-lg hover:shadow-[#1E90FF]/20 transition-all mt-4"
                  >
                    إتمام الطلب
                  </a>

                  {/* Payment methods */}
                  <div className="flex items-center justify-center gap-3 pt-3 border-t border-[#0A1A2F]/5 mt-3">
                    <span className="text-[10px] text-[#0A1A2F]/40">طرق الدفع:</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0A1A2F]/30 text-[18px]">credit_card</span>
                      <span className="material-symbols-outlined text-[#0A1A2F]/30 text-[18px]">account_balance</span>
                      <span className="material-symbols-outlined text-[#0A1A2F]/30 text-[18px]">payments</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-2xl border border-[#0A1A2F]/5 p-4 mt-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#1E90FF] text-[18px]">confirmation_number</span>
                  <span className="text-sm font-medium text-[#0A1A2F]">كود خصم</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="أدخل كود الخصم"
                    className="flex-1 bg-[#f6fafe] rounded-xl px-3 py-2.5 text-sm border border-[#0A1A2F]/5 focus:ring-2 focus:ring-[#1E90FF]/20 focus:outline-none placeholder:text-[#0A1A2F]/30"
                  />
                  <button className="bg-[#1E90FF]/10 text-[#1E90FF] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E90FF]/20 transition-colors">
                    تطبيق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#0A1A2F]/10 p-3 z-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#0A1A2F]/60">الإجمالي</span>
          <span className="text-lg font-bold text-[#0F3D5E]">{(totalPrice * 1.15).toLocaleString()} ر.س</span>
        </div>
        <a
          href="/checkout"
          className="block w-full bg-[#0F3D5E] text-white py-3.5 rounded-xl font-bold text-center text-sm hover:bg-[#1E90FF] transition-all"
        >
          إتمام الطلب
        </a>
      </div>

      <Footer />
    </>
  );
}
