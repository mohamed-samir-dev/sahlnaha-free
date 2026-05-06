"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", notes: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    if (name === "customerName" && /\d/.test(value)) return;
    setForm({ ...form, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.customerName.trim() || form.customerName.trim().length < 3) {
      errors.customerName = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }
    if (!/^(05|5)\d{8}$/.test(form.phone)) {
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    }
    if (!form.address.trim() || form.address.trim().length < 10) {
      errors.address = "العنوان يجب أن يكون 10 أحرف على الأقل";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    if (items.length === 0) {
      setError("السلة فارغة");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          address: form.address,
          notes: form.notes,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "حدث خطأ");
      clearCart();
      router.push(`/order-success?id=${data.data._id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center px-4 bg-[#f6fafe]">
          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-[#0F3D5E]/5 flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-5xl text-[#0F3D5E]/30">remove_shopping_cart</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0A1A2F] mb-2">السلة فارغة</h1>
            <p className="text-[#0A1A2F]/50 text-sm mb-6">أضف منتجات للسلة أولاً</p>
            <a href="/products" className="inline-flex items-center gap-2 bg-[#0F3D5E] text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-[#1E90FF] transition-all">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
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
        {/* Top Bar with Steps */}
        <div className="bg-[#0A1A2F]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white">إتمام الطلب</h1>
              <a href="/cart" className="text-white/50 text-sm hover:text-white flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                العودة للسلة
              </a>
            </div>
            {/* Steps */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#2ECC71] text-white text-xs font-bold flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </span>
                <span className="text-xs text-white/70 hidden sm:inline">السلة</span>
              </div>
              <div className="flex-1 h-[2px] bg-[#1E90FF] max-w-[80px] mx-2" />
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#1E90FF] text-white text-xs font-bold flex items-center justify-center">2</span>
                <span className="text-xs text-white font-medium hidden sm:inline">الدفع</span>
              </div>
              <div className="flex-1 h-[2px] bg-white/20 max-w-[80px] mx-2" />
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white/10 text-white/40 text-xs font-bold flex items-center justify-center">3</span>
                <span className="text-xs text-white/40 hidden sm:inline">التأكيد</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-2xl mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-5">
              {/* Delivery Info */}
              <div className="bg-white rounded-2xl border border-[#0A1A2F]/5 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#1E90FF]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#1E90FF] text-[20px]">location_on</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0A1A2F] text-base">بيانات التوصيل</h2>
                    <p className="text-xs text-[#0A1A2F]/40">أدخل بياناتك لتوصيل الطلب</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-[#0A1A2F]/70 mb-1.5 block">الاسم الكامل</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#0A1A2F]/25 text-[20px]">person</span>
                      <input
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        required
                        className={`w-full bg-[#f6fafe] border rounded-xl pr-10 pl-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1E90FF]/30 focus:border-[#1E90FF]/30 focus:bg-white focus:outline-none transition-all ${fieldErrors.customerName ? "border-red-300 bg-red-50/50" : "border-[#0A1A2F]/8"}`}
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    {fieldErrors.customerName && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">error</span>{fieldErrors.customerName}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#0A1A2F]/70 mb-1.5 block">رقم الهاتف</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#0A1A2F]/25 text-[20px]">phone</span>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        type="tel"
                        dir="ltr"
                        maxLength={10}
                        className={`w-full bg-[#f6fafe] border rounded-xl pr-10 pl-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1E90FF]/30 focus:border-[#1E90FF]/30 focus:bg-white focus:outline-none text-left transition-all ${fieldErrors.phone ? "border-red-300 bg-red-50/50" : "border-[#0A1A2F]/8"}`}
                        placeholder="05XXXXXXXX"
                      />
                    </div>
                    {fieldErrors.phone && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">error</span>{fieldErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#0A1A2F]/70 mb-1.5 block">العنوان الكامل</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#0A1A2F]/25 text-[20px]">home</span>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className={`w-full bg-[#f6fafe] border rounded-xl pr-10 pl-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1E90FF]/30 focus:border-[#1E90FF]/30 focus:bg-white focus:outline-none transition-all ${fieldErrors.address ? "border-red-300 bg-red-50/50" : "border-[#0A1A2F]/8"}`}
                        placeholder="المدينة - الحي - الشارع - رقم المبنى"
                      />
                    </div>
                    {fieldErrors.address && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">error</span>{fieldErrors.address}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#0A1A2F]/70 mb-1.5 block">ملاحظات <span className="text-[#0A1A2F]/30 font-normal">(اختياري)</span></label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-[#f6fafe] border border-[#0A1A2F]/8 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#1E90FF]/30 focus:border-[#1E90FF]/30 focus:bg-white focus:outline-none resize-none transition-all"
                      placeholder="ملاحظات إضافية للتوصيل..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-[#0A1A2F]/5 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#2ECC71]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#2ECC71] text-[20px]">payments</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0A1A2F] text-base">طريقة الدفع</h2>
                    <p className="text-xs text-[#0A1A2F]/40">اختر طريقة الدفع المناسبة</p>
                  </div>
                </div>

                <div className="border-2 border-[#0F3D5E] rounded-2xl p-4 bg-[#0F3D5E]/[0.02] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0F3D5E]/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#0F3D5E] text-[24px]">local_shipping</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#0A1A2F] text-sm">الدفع عند الاستلام</p>
                    <p className="text-xs text-[#0A1A2F]/50 mt-0.5">ادفع نقداً عند استلام طلبك</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-[#0F3D5E] flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0F3D5E]" />
                  </div>
                </div>
              </div>

              {/* Submit - Desktop */}
              <button
                type="submit"
                disabled={loading}
                className="hidden lg:flex w-full bg-[#0F3D5E] text-white py-4.5 rounded-2xl font-bold text-base items-center justify-center gap-2 hover:bg-[#1E90FF] hover:shadow-xl hover:shadow-[#1E90FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    تأكيد الطلب - {Math.round(totalPrice * 1.15).toLocaleString()} ر.س
                  </>
                )}
              </button>
            </form>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-white rounded-2xl border border-[#0A1A2F]/5 overflow-hidden sticky top-6">
                <div className="p-5 sm:p-6">
                  <h2 className="font-bold text-[#0A1A2F] text-base mb-4">طلبك ({items.length} منتج)</h2>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pl-1">
                    {items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f6fafe] transition-colors">
                        <div className="w-14 h-14 rounded-xl bg-[#f8fbff] border border-[#0A1A2F]/5 overflow-hidden shrink-0">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-full h-full object-contain p-1.5"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#0A1A2F] truncate">{item.name}</p>
                          <p className="text-xs text-[#0A1A2F]/40 mt-0.5">{item.quantity} × {item.price.toLocaleString()} ر.س</p>
                        </div>
                        <span className="text-sm font-bold text-[#0F3D5E] shrink-0">{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f6fafe] p-5 sm:p-6 border-t border-[#0A1A2F]/5 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0A1A2F]/50">المجموع الفرعي</span>
                    <span className="font-medium text-[#0A1A2F]">{totalPrice.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0A1A2F]/50">الشحن</span>
                    <span className="font-medium text-[#2ECC71]">مجاني</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0A1A2F]/50">الضريبة (15%)</span>
                    <span className="font-medium text-[#0A1A2F]">{Math.round(totalPrice * 0.15).toLocaleString()} ر.س</span>
                  </div>
                  <div className="pt-3 mt-3 border-t-2 border-dashed border-[#0A1A2F]/10 flex justify-between items-center">
                    <span className="font-bold text-[#0A1A2F]">الإجمالي</span>
                    <span className="text-2xl font-bold text-[#0F3D5E]">{Math.round(totalPrice * 1.15).toLocaleString()} <span className="text-sm">ر.س</span></span>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[#0A1A2F]/30 text-xs">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>بياناتك محمية ومشفرة بالكامل</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#0A1A2F]/10 px-4 py-3 z-50">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#0F3D5E] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1E90FF] transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              تأكيد الطلب - {Math.round(totalPrice * 1.15).toLocaleString()} ر.س
            </>
          )}
        </button>
      </div>

      <Footer />
    </>
  );
}
