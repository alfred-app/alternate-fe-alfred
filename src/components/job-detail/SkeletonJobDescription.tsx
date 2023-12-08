export default function SkeletonJobDescription() {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-10 p-10 px-5 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-7">
      {/* Title, Time & Edit Button */}
      <div className="w-full flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col justify-center gap-1">
          <h2 className="text-xl font-semibold md:text-2xl">
            ...
          </h2>
          {/* <span className="text-sm text-gray-500">...</span> */}
        </div>

        <button className="px-5 py-3 text-sm font-medium rounded-full text-white bg-[#5F4BDB] opacity-50">
          ...
        </button>
      </div>

      {/* Application, Time Left & Location */}
      <div className="w-full flex flex-col items-left gap-5 sm:flex-row sm:justify-center sm:gap-10 md:justify-start">
        {/* <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-400"></div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">...</span>
            <p className="text-sm font-light text-gray-500">Pelamar</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-400"></div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">...</span>
            <p className="text-sm font-light text-gray-500">Sisa Waktu</p>
          </div>
        </div> */}

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-400"></div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">...</span>
            <p className="text-sm font-light text-gray-500">Jarak</p>
          </div>
        </div>
      </div>

      {/* Alamat */}
      <div className="w-full flex flex-col gap-3">
        <span className="font-semibold">Alamat</span>
        <p className="text-sm text-gray-500">...</p>
      </div>

      {/* Job Description */}
      <div className="w-full flex flex-col gap-3">
        <span className="font-semibold">Deskripsi Pekerjaan</span>
        <p className="text-sm text-gray-500">...</p>
      </div>

      {/* Gallery */}
      {/* <div className="relative w-full flex flex-col gap-3">
        <span className="font-semibold">Gallery</span>
        <div className="w-full h-32"></div>
        <div className="absolute top-11 w-full flex items-center justify-start gap-5 overflow-x-auto">
          <div className="min-w-[200px] h-32 rounded-xl bg-gray-600 opacity-50"></div>
          <div className="min-w-[200px] h-32 rounded-xl bg-gray-600 opacity-50"></div>
          <div className="min-w-[200px] h-32 rounded-xl bg-gray-600 opacity-50"></div>
        </div>
      </div> */}
    </div>
  );
}
