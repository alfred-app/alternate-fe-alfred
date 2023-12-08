import Link from 'next/link';

export default function Links() {
  return (
    <nav className="w-full flex items-center pt-5 border-t border-gray-700 md:border-t-0 md:max-w-[250px]">
      <div className="w-fit flex flex-col gap-4">
        <span className="text-2xl font-semibold">Links</span>

        <div className="flex flex-col gap-3">
          <Link href={'/'} className="py-2 font-light">
            Beranda
          </Link>
          <Link href={'/dashboard'} className="py-2 font-light">
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
}
