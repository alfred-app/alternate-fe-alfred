import axios from 'axios';
import ApplicationCard from './ApplicationCard';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function ApplicationList() {
  // Get current job id
  const router = useRouter();
  const { id } = router.query;

  // SWR fetcher function
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((data) => {
        return data.data;
      })
      .catch((error) => console.log('Error Fetching Data'));

  // Fetch job bidlist
  const { data, isLoading } = useSWR(
    `https://alfred-server.up.railway.app/bidlist/job/${id}`,
    fetcher,
  );

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl p-5 flex flex-col items-center justify-between gap-5 sm:flex-row">
        <span className="text-xl text-center font-semibold sm:text-2xl">
          {isLoading
            ? 'Menghitung jumlah lamaran...'
            : !data
              ? 'Tidak ada lamaran'
              : `Terdapat ${data.length} Lamaran`}
        </span>

        {/* <form className="flex flex-col items-start gap-3">
          <div className="relative flex items-center">
            <select
              title="job location"
              name="exploreJobSearchLocation"
              className="w-36 h-12 px-5 py-2 text-ellipsis rounded-full border border-gray-300"
            >
              <option value="semua">Terbaru</option>
              <option value="jakarta">Terlama</option>
            </select>
          </div>
        </form> */}
      </div>

      <div className="w-full max-w-7xl p-5 pb-12 flex flex-col items-center gap-7">
        {!isLoading &&
          data &&
          data.map((bidData: any) => (
            <ApplicationCard key={bidData.id} bidData={bidData} />
          ))}
      </div>
    </div>
  );
}
