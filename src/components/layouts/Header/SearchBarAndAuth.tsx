import Link from "next/link";

export default function SearchBarAndAuth() {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <div className="relative flex items-center">
        <div className="absolute w-8 h-8 rounded-full right-3 bg-slate-600"></div>
        <input
          type="text"
          name="quickJobSearch"
          placeholder="Cari lowongan..."
          className="w-[280px] pl-5 pr-12 py-3 rounded-full text-sm border border-gray-300 sm:w-[340px]"
        />
      </div>

      <Link href={"/client-login"} className="px-5 py-3 rounded-full bg-[#F0EEFF]">
        Log In
      </Link>

      <Link
        href={"/client-register"}
        className="px-5 py-3 rounded-full bg-[#5F4BDB] text-white"
      >
        Sign Up
      </Link>
    </div>
  );
}
