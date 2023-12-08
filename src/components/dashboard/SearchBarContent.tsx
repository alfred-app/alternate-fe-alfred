export default function SearchBarContent() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-7 bg-[#5F4BDB]">
      <div className="w-full max-w-7xl h-[70vh] min-h-[380px] max-h-[650px] p-5 flex flex-col items-center justify-center gap-10">
        <h1 className="font-semibold text-center text-2xl text-white sm:text-3xl md:text-4xl">
          Cari Lebih Dari{' '}
          <span className="bg-gradient-to-r from-orange-300 to-cyan-300 bg-clip-text text-transparent pl-2 pr-1 text-3xl sm:text-4xl md:text-5xl">
            200+
          </span>{' '}
          Pekerjaan
        </h1>

        {/* <SearchBarMobile /> */}
        {/* <SearchBarDesktop /> */}

        <div className="flex flex-col items-center gap-3 mt-10 text-white">
          <span className="text-sm text-center font-light sm:text-base">
            scroll kebawah untuk lihat lowongan
          </span>
          <div>v</div>
        </div>
      </div>
    </div>
  );
}
