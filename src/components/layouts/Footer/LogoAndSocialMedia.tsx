export default function LogoAndSocialMedia() {
  return (
    <div className="w-full flex flex-col justify-center gap-6 md:w-fit">
      <span className="text-4xl">Alfred</span>

      <p className="max-w-xs text-sm sm:text-base">
        Alfred is a Freelance Landing Website lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      </p>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#3CB5DB]"></div>
        <div className="w-12 h-12 rounded-full bg-[#3CB5DB]"></div>
        <div className="w-12 h-12 rounded-full bg-[#3CB5DB]"></div>
      </div>
    </div>
  );
}
