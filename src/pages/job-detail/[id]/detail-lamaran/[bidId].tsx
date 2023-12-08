import AcceptApplicationForm from '@/components/job-detail/detail-lamaran/AcceptApplicationForm';
import JobDetailsApplicationCard from '@/components/job-detail/detail-lamaran/JobDetailsApplicationCard';
import TitleBanner from '@/components/shared/TitleBanner';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import LoadingCard from '@/components/shared/LoadingCard';
import TalentDetailsCard from '@/components/job-detail/detail-lamaran/TalentDetailsCard';

interface BidDetail {
  id: string;
  talentID: string;
  jobID: string;
  priceOnBid: number;
  bidPlaced: string;
}

const DetailLamaranPage: React.FC = () => {
  const router = useRouter();
  const { bidId } = router.query;

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

  // Fetch bidlist
  const { data, isLoading } = useSWR(
    typeof window == 'undefined'
      ? null
      : `https://alfred-server.up.railway.app/bidlist/${bidId}`,
    fetcher,
  );

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 font-poppins">
      <TitleBanner title="Detail Lamaran" />

      <div className="w-full flex flex-col items-center justify-center gap-8 px-3 sm:px-8">
        {typeof window == 'undefined' || isLoading ? (
          <LoadingCard />
        ) : (
          <>
            <JobDetailsApplicationCard jobID={data.jobID} />
            <div className="h-11 w-1 rounded-full -translate-y-32 bg-[#5F4BDB]"></div>
            <TalentDetailsCard talentID={data.talentID} />
            <AcceptApplicationForm bidData={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailLamaranPage;
