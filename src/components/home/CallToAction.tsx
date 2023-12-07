export default function CallToAction() {
  return (
    <section className="w-full px-3 py-16 flex items-center justify-center gap-5 bg-[#5F4BDB]">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-12">
        <h2 className="text-2xl text-white">Call To Action</h2>

        <form className="w-full max-w-lg relative flex items-center md:max-w-3xl">
          <div className="absolute w-8 h-8 rounded-full right-3 bg-slate-600"></div>
          <input
            type="search"
            name="landingPageJobSearch"
            placeholder="Cari lowongan..."
            className="w-full pl-5 pr-12 py-3 rounded-full border text-sm border-gray-300"
          />
        </form>
      </div>
    </section>
  );
}
