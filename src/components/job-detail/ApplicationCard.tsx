import Link from 'next/link';

export default function ApplicationCard({ bidData }: { bidData: any }) {
  const { priceOnBid, bidPlaced } = bidData;

  return (
    <div className="w-full p-5 flex flex-col items-center gap-5 rounded-xl border border-gray-100 shadow-lg">
      <div className="w-full flex flex-col items-center gap-5 sm:flex-row">
        <div className="min-w-[144px] h-36 rounded-lg bg-slate-600"></div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xl line-clamp-3 md:text-2xl sm:line-clamp-1">
            Rp. {priceOnBid}
          </span>

          <span className="text-[#5F4BDB] md:text-lg">{bidPlaced}</span>

          {/* <p className="mt-2 text-sm text-gray-500 line-clamp-4 sm:line-clamp-3">
            Saya berikamn garansi 2 tahun selama bukan rusak force majeur Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Ex, assumenda
            architecto nemo optio magni obcaecati.
          </p> */}
        </div>
      </div>

      {/* <div className="w-full flex flex-col gap-9 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 border-t pt-5 text-sm sm:text-base sm:flex-row sm:items-center sm:border-none sm:pt-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-600"></div>
            <span>24.2 km</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-600"></div>
            <span>Rp. {priceOnBid}</span>
          </div>
        </div>

        <div className="w-full flex justify-between gap-3 md:w-fit md:justify-start">
          <Link
            href={'/id/proposal/123'}
            className="px-5 py-3 rounded-full font-semibold text-[#FE6D1B] bg-[#FFE8DC]"
          >
            Lihat Detail
          </Link>
        </div>
      </div> */}
    </div>
  );
}
