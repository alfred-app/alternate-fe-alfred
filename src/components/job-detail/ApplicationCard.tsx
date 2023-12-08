import Link from 'next/link';

export default function ApplicationCard({ bidData }: { bidData: any }) {
  const { priceOnBid, bidPlaced, id, talentID, jobID } = bidData;

  return (
    <div className="w-full p-5 flex flex-col items-center justify-center gap-5 rounded-xl border border-gray-100 shadow-lg sm:flex-row">
      <div className="w-full flex flex-col items-center gap-5 sm:flex-row sm:w-3/5 md:w-4/5">
        <div className="min-w-[144px] h-36 rounded-lg bg-slate-600"></div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xl line-clamp-3 md:text-2xl sm:line-clamp-1">
            Rp. {priceOnBid}
          </span>

          <span className="text-[#5F4BDB] md:text-lg">{bidPlaced}</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-9 items-end sm:w-2/5 md:w-1/5">
        <div className="w-full flex justify-center gap-3 sm:justify-end md:w-fit">
          <Link
            href={`/job-detail/${jobID}/detail-lamaran/${id}`}
            className="px-5 py-3 rounded-full font-semibold text-[#FE6D1B] bg-[#FFE8DC]"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
