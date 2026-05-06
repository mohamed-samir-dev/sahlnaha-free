import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden flex items-center">
      <Image
        src="/hero.webp"
        alt="مؤسسة سهلناها التقنيه - أفضل الأجهزة بأعلى جودة وأفضل سعر"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F]/90 via-[#0F3D5E]/80 to-[#1E90FF]/40" />
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-[#1E90FF]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-72 sm:h-72 rounded-full bg-[#2ECC71]/10 blur-3xl" />
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-[#1E90FF]/20 border border-[#1E90FF]/40 text-[#1E90FF] text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 sm:mb-6">
          مؤسسة سهلناها التقنيه
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto mb-4 md:mb-6">
          أفضل الأجهزة الإلكترونية بأعلى جودة وأفضل سعر
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 md:mb-10">
          نوفر لكم أحدث الابتكارات التقنية من أرقى الماركات العالمية لضمان تجربة استثنائية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a href="/products" className="bg-[#1E90FF] text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-base sm:text-lg font-semibold hover:shadow-lg hover:shadow-[#1E90FF]/40 hover:scale-105 transition-all duration-300">
            تسوق الآن
          </a>
          <a href="/contact" className="border-2 border-white/30 text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-base sm:text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
}
