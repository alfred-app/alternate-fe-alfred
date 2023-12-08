import axios from 'axios';
import useSWR from 'swr';

export default function ClientProfile({ clientID }: { clientID: string }) {
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

  // Fetch client data
  const { data, isLoading } = useSWR(
    `https://alfred-server.up.railway.app/client/${clientID}`,
    fetcher,
  );

  if (!isLoading) console.log(data);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-7 p-10 px-5 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-7 md:w-fit">
      {/* Profile Pic & Name */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-24 h-24 rounded-full bg-gray-500"></div>
        <span className="font-medium">{isLoading ? '...' : data.name}</span>
      </div>

      {/* Reviews */}
      {/* <div className="w-full flex flex-col items-left justify-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-yellow-400"></div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">4.5</span>
            <p className="text-sm font-light text-gray-500">Ulasan</p>
          </div>
        </div>
      </div> */}

      {/* Location */}
      <div className="w-full flex flex-col items-left justify-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gray-400"></div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold line-clamp-3">
              {isLoading ? '...' : data.address}
            </span>
            <p className="text-sm font-light text-gray-500">Alamat</p>
          </div>
        </div>
      </div>

      {/* Available Jobs & More Details Link */}
      <div className="w-full flex items-left justify-center gap-3 pt-5 border-t text-center">
        <div className="px-5 py-3 rounded-full text-sm font-semibold text-[#5F4BDB] bg-[#F0EEFF]">
          {isLoading ? '...' : `${data.jobs.length} Lowongan`}
        </div>
        <button className="px-5 py-3 rounded-full text-sm font-semibold text-[#FE6D1B] bg-[#FFE8DC]">
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
