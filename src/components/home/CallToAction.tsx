import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="w-full px-3 py-16 flex items-center justify-center gap-5 bg-[#5F4BDB]">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-12 text-center">
        <h2 className="text-2xl text-white font-medium md:text-3xl">
          Cari Tahu Kerjaan Di Lingkunganmu
        </h2>

        <Link
          href={'/dashboard'}
          className="flex items-center gap-3 p-5 px-8 rounded-full bg-white"
        >
          <span className="text-xl font-medium">Explore</span>
        </Link>
        {/* <form className="w-full max-w-lg relative flex items-center md:max-w-3xl">
          <input
            type="search"
            name="landingPageJobSearch"
            placeholder="Cari lowongan..."
            className="w-full pl-5 pr-12 py-3 rounded-full border text-sm border-gray-300"
          />
        </form> */}
      </div>
    </section>
  );
}
