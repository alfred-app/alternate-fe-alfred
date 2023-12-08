import Link from 'next/link';
import { useState } from 'react';

export default function MobileNavMenu() {
  const [displayMenu, setDisplayMenu] = useState(false);

  const closeMenu = () => {
    setDisplayMenu(false);
  };

  return (
    <div className="relative flex flex-col gap-5 md:hidden">
      <div
        onClick={() => setDisplayMenu((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-slate-600"
      ></div>

      {displayMenu && (
        <div className="absolute right-0 top-20 flex flex-col gap-3 p-5 border border-gray-300 rounded-lg bg-white md:hidden">
          <div className="relative flex items-center border-b pb-5">
            <div className="absolute w-8 h-8 rounded-full right-3 bg-slate-600"></div>
            <input
              type="text"
              name="quickJobSearch"
              placeholder="Cari lowongan..."
              className="w-[280px] pl-5 pr-12 py-3 rounded-full text-sm border border-gray-300 sm:w-[340px]"
            />
          </div>

          <div className="flex flex-col items-end gap-2 border-b pb-3 text-right sm:hidden">
            <Link
              href={'/'}
              onClick={() => closeMenu()}
              className="w-full px-5 py-3 rounded-full hover:bg-slate-100"
            >
              Beranda
            </Link>
            <Link
              href={'/dashboard'}
              onClick={() => closeMenu()}
              className="w-full px-5 py-3 rounded-full hover:bg-slate-100"
            >
              Explore
            </Link>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              href={'/client-login'}
              className="w-fit px-6 py-3 rounded-full bg-[#F0EEFF]"
            >
              Log In
            </Link>
            <Link
              href={'/client-register'}
              className="w-fit px-6 py-3 rounded-full bg-[#5F4BDB] text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
