import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata = {
  title: "من نحن | مؤسسة سهلناها التقنيه",
  description: "تعرف على مؤسسة سهلناها التقنيه - وجهتكم الأولى لأحدث الأجهزة الإلكترونية في المملكة العربية السعودية",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D5E] mb-4">من نحن</h1>
          <p className="text-[#0A1A2F]/70 text-base sm:text-lg max-w-2xl mx-auto">
            مؤسسة سهلناها التقنيه - شريككم الموثوق في عالم التقنية
          </p>
        </section>

        {/* About Section */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4">مؤسسة سهلناها التقنيه</h2>
            <p className="text-[#0A1A2F]/70 leading-relaxed mb-4">
              نحن مؤسسة سعودية متخصصة في توفير أحدث الأجهزة الإلكترونية والتقنيات المنزلية والمكتبية بأعلى جودة وأفضل الأسعار. نسعى لأن نكون الوجهة الأولى لعملائنا في المملكة العربية السعودية.
            </p>
            <p className="text-[#0A1A2F]/70 leading-relaxed">
              نؤمن بأن التقنية يجب أن تكون في متناول الجميع، ولذلك نحرص على تقديم منتجات عالية الجودة بأسعار تنافسية مع خدمة عملاء متميزة تضمن رضاكم التام.
            </p>
          </div>
          <div className="bg-[#0F3D5E]/5 rounded-2xl p-5 sm:p-8 border border-[#1E90FF]/20">
            <h3 className="text-xl font-bold text-[#0A1A2F] mb-6">معلومات المؤسسة</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1E90FF]">store</span>
                <span className="text-[#0A1A2F]/70">مؤسسة سهلناها التقنيه</span>
              </div>
              <a href="/commercial-register" className="flex items-center gap-3 hover:text-[#1E90FF] transition-colors">
                <span className="material-symbols-outlined text-[#2ECC71]">verified</span>
                <span className="text-[#0A1A2F]/70">السجل التجاري: 7054284067</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1E90FF]">location_on</span>
                <span className="text-[#0A1A2F]/70">المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1E90FF]">phone</span>
                <span className="text-[#0A1A2F]/70" dir="ltr">0592069730</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A2F] text-center mb-6 md:mb-10">لماذا سهلناها؟</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "verified", title: "منتجات أصلية", desc: "نضمن أصالة جميع منتجاتنا بكفالة رسمية" },
              { icon: "local_shipping", title: "توصيل سريع", desc: "نوصل طلبك بأسرع وقت لباب بيتك" },
              { icon: "support_agent", title: "دعم متواصل", desc: "فريق دعم جاهز لخدمتكم على مدار الساعة" },
              { icon: "payments", title: "أسعار منافسة", desc: "أفضل الأسعار مع عروض وخصومات مستمرة" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4 sm:p-6 text-center border border-[#1E90FF]/15 shadow-sm">
                <span className="material-symbols-outlined text-[#1E90FF] text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</span>
                <h3 className="font-bold text-[#0A1A2F] text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-[#0A1A2F]/60 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-[#1E90FF]/5 rounded-2xl p-5 sm:p-8 border border-[#1E90FF]/20">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F3D5E] mb-3">رؤيتنا</h3>
            <p className="text-[#0A1A2F]/70 leading-relaxed">
              أن نكون المنصة الرائدة في مجال الأجهزة الإلكترونية في المملكة العربية السعودية، ونقدم تجربة تسوق إلكتروني متميزة وموثوقة.
            </p>
          </div>
          <div className="bg-[#1E90FF]/5 rounded-2xl p-5 sm:p-8 border border-[#1E90FF]/20">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F3D5E] mb-3">رسالتنا</h3>
            <p className="text-[#0A1A2F]/70 leading-relaxed">
              توفير أحدث الأجهزة الإلكترونية بجودة عالية وأسعار تنافسية، مع تقديم خدمة عملاء استثنائية تلبي تطلعات عملائنا وتتجاوز توقعاتهم.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
