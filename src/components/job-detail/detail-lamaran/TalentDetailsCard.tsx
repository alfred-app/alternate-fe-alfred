import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function TalentDetailsCard({ talentID }: { talentID: string }) {
  const router = useRouter();

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
    `https://alfred-server.up.railway.app/talent/${talentID}`,
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 p-10 px-5 border border-gray-200 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-10">
        <div className="w-full flex flex-col items-center gap-8 overflow-x-auto sm:flex-row sm:items-center">
          <div className="w-28 h-28 rounded-full bg-gray-600"></div>
          {/* Talent Details */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-xl line-clamp-3 md:text-2xl sm:line-clamp-1">
              ...
            </span>
            <span className="line-clamp-1 text-[#5F4BDB]">...</span>
            <span className="text-sm line-clamp-1 text-gray-500">...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 p-10 px-5 border border-gray-200 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-10">
        <div className="w-full flex flex-col items-center gap-8 overflow-x-auto sm:flex-row sm:items-center">
          <div className="w-28 h-28 rounded-full bg-gray-600"></div>
          {/* Talent Details */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-xl line-clamp-3 md:text-2xl sm:line-clamp-1">
              {data.name}
            </span>
            <span className="line-clamp-1 text-[#5F4BDB]">
              {data.phoneNumber}
            </span>
            <span className="text-sm line-clamp-1 text-gray-500">
              {data.email}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
