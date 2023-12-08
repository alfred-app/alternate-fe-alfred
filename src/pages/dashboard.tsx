import SearchBarContent from '@/components/dashboard/SearchBarContent';
import SearchResult from '@/components/dashboard/SearchResult';

const DashboardPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 font-poppins">
      <SearchBarContent />

      <SearchResult />
    </div>
  );
};

export default DashboardPage;
