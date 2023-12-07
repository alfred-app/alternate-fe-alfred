export default function Copyright() {
  return (
    <div className="w-full flex items-center justify-center border-t border-gray-700">
      <div className="w-full max-w-7xl px-3 py-5 flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <span className="text-sm text-gray-400">
          © Alfred Freelancer Landing Website {new Date().getFullYear()}. All
          Rights Reserved.
        </span>
      </div>
    </div>
  );
}
