'use client';
import Link from 'next/link';
import JobCard from './JobCard';
import useSWR from 'swr';
import axios from 'axios';
import LoadingCard from '../shared/LoadingCard';

export default function SearchResult() {
  // SWR
  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((data) => {
        return data.data;
      })
      .catch((error) => console.log('Error Fetching Data'));
  const { data, isLoading } = useSWR(
    'https://alfred-server.up.railway.app/job/all',
    fetcher,
  );

  if (isLoading) {
    return <LoadingCard />;
  } else {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl p-5 flex items-center justify-between gap-5">
          <span className="text-xl font-semibold sm:text-2xl">
            Showing {data.length} Jobs
          </span>

          <div className="flex">
            <Link
              href={'/tambah-pekerjaan'}
              className="flex items-center gap-3 p-3 rounded-full bg-[#5F4BDB] text-white sm:px-5 sm:py-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100"></div>
              <span className="hidden sm:inline">Buat Pekerjaan</span>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-7xl p-5 pb-12 flex flex-col items-center gap-7">
          {data.length === 0 ? (
            <span>No Data</span>
          ) : (
            data.map((job: any) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    );
  }
}
