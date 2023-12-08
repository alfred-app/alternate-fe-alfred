"use client";
import { useRouter } from "next/navigation";

export default function TitleBanner({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center gap-7 bg-[#5F4BDB]">
      <div className="relative w-full max-w-7xl h-[40vh] min-h-[280px] max-h-[400px] p-5 flex flex-col items-center justify-center gap-10">
        <button
          onClick={() => router.back()}
          className="absolute top-7 w-12 h-12 rounded-full text-4xl bg-white font-light md:left-7"
        >
          {"<"}
        </button>
        <h1 className="font-semibold text-center text-2xl -translate-y-12 text-white sm:text-3xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
