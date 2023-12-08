import Image from 'next/image';
import heroImage from '../../../public/hero-image.png';

export default function HeroContent() {
  return (
    <section className="w-full px-3 py-5 flex items-center justify-center gap-5">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 sm:flex-row">
        <div className="min-w-[220px] rounded-xl w-3/5">
          <Image
            src={heroImage}
            alt={`hero image`}
            width={0}
            height={0}
            sizes="100%"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <h1 className="text-3xl text-center font-bold leading-relaxed sm:text-4xl sm:text-left sm:leading-relaxed md:text-5xl md:leading-relaxed">
          Pencari Jasa Lokal Disekitar Anda
        </h1>
      </div>
    </section>
  );
}
