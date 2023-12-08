import ApplyJobForm from '@/components/job-detail/lamar/ApplyJobForm';
import JobDetailsCard from '@/components/job-detail/lamar/JobDetailsCard';
import TitleBanner from '@/components/shared/TitleBanner';

const LamarJobPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 font-poppins">
      <TitleBanner title="Taruh Bid" />

      <div className="w-full flex flex-col items-center justify-center gap-8 px-3 sm:px-8">
        <JobDetailsCard />
        <ApplyJobForm />
      </div>
    </div>
  );
};

export default LamarJobPage;
