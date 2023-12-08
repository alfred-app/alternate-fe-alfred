'use client';
import ApplicationList from '@/components/job-detail/ApplicationList';
import ClientProfile from '@/components/job-detail/ClientProfile';
import JobDescription from '@/components/job-detail/JobDescription';
import SkeletonClientProfile from '@/components/job-detail/SkeletonClientProfile';
import SkeletonJobDescription from '@/components/job-detail/SkeletonJobDescription';
import LoadingCard from '@/components/shared/LoadingCard';
import TitleBanner from '@/components/shared/TitleBanner';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const JobDetailPage: React.FC = () => {
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

  // Fetch job by ID
  const { data, isLoading } = useSWR(
    `https://alfred-server.up.railway.app/job/${id}`,
    fetcher,
  );

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 font-poppins">
      <TitleBanner title="Detail Pekerjaan" />

      <div className="w-full flex flex-col items-start justify-center gap-5 px-3 sm:px-8 md:flex-row">
        {isLoading ? (
          <>
            <SkeletonClientProfile />
            <SkeletonJobDescription />
          </>
        ) : (
          <>
            <ClientProfile clientID={data.clientID} />
            <JobDescription data={data} />
          </>
        )}
      </div>

      <div className="w-full flex flex-col items-center justify-center px-3 -translate-y-12 sm:px-8">
        {isLoading ? <LoadingCard /> : <ApplicationList />}
      </div>
    </div>
  );
};

export default JobDetailPage;
