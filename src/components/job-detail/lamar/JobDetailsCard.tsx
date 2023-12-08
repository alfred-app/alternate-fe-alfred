import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function JobDetailsCard() {
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

  // Fetch job by ID
  const { data, isLoading } = useSWR(
    `https://alfred-server.up.railway.app/job/${id}`,
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 p-10 px-5 border border-gray-200 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-10">
        <div className="w-full flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Job Title & Address */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-xl line-clamp-3 md:text-2xl sm:line-clamp-1">
              ...
            </span>
            <span className="text-sm text-[#5F4BDB]">...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 p-10 px-5 border border-gray-200 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-10">
        <div className="w-full flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Job Title & Address */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-xl line-clamp-3 md:text-2xl sm:line-clamp-1">
              {data.name}
            </span>
            <span className="text-sm line-clamp-5 text-[#5F4BDB]">
              {data.address}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
