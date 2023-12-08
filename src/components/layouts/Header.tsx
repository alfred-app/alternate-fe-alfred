'use client';
import LogoAndLinks from './Header/LogoAndLinks';
import SearchBarAndAuth from './Header/SearchBarAndAuth';
import MobileNavMenu from './Header/MobileNavMenu';

export default function Header() {
  return (
    <header className="w-full px-3 py-5 flex items-center justify-center font-poppins border-b">
      <div className="w-full max-w-7xl flex items-center justify-between gap-5">
        <LogoAndLinks />
        <SearchBarAndAuth />
        <MobileNavMenu />
      </div>
    </header>
  );
}
