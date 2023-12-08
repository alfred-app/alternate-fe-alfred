'use client';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AcceptApplicationForm({ bidData }: { bidData: any }) {
  const { jobID, talentID, priceOnBid } = bidData;

  const router = useRouter();

  // Handle submit
  const submitNewJob = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in');
      router.push('/login');
      return;
    }

    try {
      const response = axios.post(
        `https://alfred-server.up.railway.app/job/set-talent`,
        {
          jobID: jobID,
          talentID: talentID,
          fixedPrice: priceOnBid,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      router.replace(`/job-detail/${jobID}`);
    } catch (error) {
      console.error('Error accepting bid:', error);
      alert('Error accepting bid. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 p-10 px-5 border border-gray-200 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-10">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full flex flex-col items-center text-center gap-5">
          <span className="font-medium text-gray-500 sm:text-lg">Harga</span>
          <span className="font-semibold text-2xl line-clamp-2 px-12 py-5 rounded-full border border-gray-300 md:text-3xl">
            Rp. {priceOnBid}
          </span>
        </div>

        <button
          onClick={() => submitNewJob()}
          className="px-7 py-3 font-medium rounded-full border border-gray-300 text-white bg-[#5F4BDB]"
        >
          Terima Lamaran
        </button>
      </div>
    </div>
  );
}
