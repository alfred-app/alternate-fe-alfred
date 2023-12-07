export default function Contacts() {
  return (
    <div className="w-full flex flex-col gap-6 pt-5 border-t border-gray-700 md:border-t-0 md:w-fit">
      <span className="min-w-[250px] text-2xl font-semibold">
        Get in Touch with Us
      </span>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#3CB5DB]"></div>
          <p>Jl. Pahlawan Indonesia</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#3CB5DB]"></div>
          <p>+628123456789</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#3CB5DB]"></div>
          <p>support@alfred.com</p>
        </div>
      </div>
    </div>
  );
}
