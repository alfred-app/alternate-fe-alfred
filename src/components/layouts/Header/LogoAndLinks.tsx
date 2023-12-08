import Link from 'next/link';

export default function LogoAndLinks() {
  return (
    <div className="flex items-center gap-7">
      <span className="text-4xl">Alfred</span>
      <div className="hidden items-center gap-2 sm:flex">
        <Link href={'/'} className="px-5 py-3 rounded-full hover:bg-slate-100">
          Beranda
        </Link>
        <Link
          href={'/dashboard'}
          className="px-5 py-3 rounded-full hover:bg-slate-100"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}
