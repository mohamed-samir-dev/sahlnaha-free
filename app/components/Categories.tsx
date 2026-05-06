const categories = [
  {
    name: "تكييفات",
    image: "/taq.webp",
    slug: "air_conditioners",
    large: true,
  },
  {
    name: "أجهزة منزلية",
    image: "/home.webp",
    slug: "home_devices",
  },
  {
    name: "اكسسوارات",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_HS1-Jqrva8---ufTRtXtlmhtNDG9HQvyb721os3DnCydMgI5g0YZ8lr78RFiWFnTtXiXNnj_cRME46EQqcuLdGU_f-er5Hl9seeBL-zBIw5OdgMkAhThpy57YmHatN0J2U4Kvm2VA8WLOWs5KzdNY7rHC2eKCBfA0Dff8EDZUaW_QKX0FGd4FI3fQhW2mTR2aeKOuV0y1H1aK1-c1PaWDE8li0l-JKld9VSHnNQIm775a0t5UBYCpy3zXWQAJ4bqqDBzpavR0w",
    slug: "accessories",
  },
];

export default function Categories() {
  return (
    <section className="py-10 sm:py-14 md:py-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-[32px] md:leading-[40px] font-semibold text-[#0F3D5E] mb-2">تصفح حسب الفئة</h2>
        <div className="w-16 h-1 bg-[#1E90FF] mx-auto rounded-full" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:h-[420px]">
        {categories.map((cat, i) => (
          <a
            href={`/products?category=${cat.slug}`}
            key={i}
            className={`${cat.large ? "md:flex-[2]" : "md:flex-1"} relative group overflow-hidden rounded-2xl h-[200px] md:h-full`}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt={cat.name}
              src={cat.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F]/80 via-[#0A1A2F]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">{cat.name}</span>
              <div className="flex items-center gap-2 mt-2 text-[#1E90FF] text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>تصفح المنتجات</span>
                <span className="material-symbols-outlined text-sm">arrow_back</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
