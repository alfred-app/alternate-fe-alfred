export default function Benefits() {
  return (
    <section className="w-full px-3 py-5 flex items-center justify-center gap-5">
      <div className="w-full max-w-5xl flex flex-col justify-center gap-5">
        <h2 className="text-2xl">Benefit</h2>

        <div className="w-full flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <div className="w-40 h-40 rounded-full bg-slate-600 sm:w-48 sm:h-48"></div>

          <div className="w-full flex flex-col items-center justify-center gap-5 sm:max-w-sm md:max-w-lg">
            <div className="w-full flex items-center justify-between gap-3 border-b">
              <button className="px-3 py-2 text-lg font-medium rounded-t-lg bg-[#5F4BDB] text-white">
                Benefit 1
              </button>
              <button className="px-3 py-2 text-lg font-medium">
                Benefit 2
              </button>
              <button className="px-3 py-2 text-lg font-medium">
                Benefit 3
              </button>
            </div>

            <p className="w-full text-center sm:text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
