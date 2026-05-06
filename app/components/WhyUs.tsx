const features = [
  { icon: "verified", title: "جودة مضمونة", desc: "جميع منتجاتنا أصلية وتخضع لأعلى معايير الجودة العالمية", color: "bg-[#2ECC71]" },
  { icon: "payments", title: "سعر تنافسي", desc: "نضمن لك أفضل الأسعار في السوق مع عروض حصرية ومستمرة", color: "bg-[#1E90FF]" },
  { icon: "local_shipping", title: "شحن سريع", desc: "خدمة توصيل سريعة وموثوقة لجميع مناطق المملكة خلال وقت قياسي", color: "bg-[#0F3D5E]" },
  { icon: "handshake", title: "الدفع عند الاستلام", desc: "نوفر لك خيارات دفع مرنة وآمنة تشمل الدفع عند الاستلام", color: "bg-[#1E90FF]" },
];

export default function WhyUs() {
  return (
    <section dir="rtl" className="py-12 sm:py-16 md:py-20 bg-[#0A1A2F] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1E90FF]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F3D5E]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">لماذا تختارنا؟</h2>
          <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto">نسعى دائماً لتقديم أفضل تجربة تسوق لعملائنا</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-[#1E90FF]/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${f.color} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-white text-xl sm:text-2xl">{f.icon}</span>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">{f.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
