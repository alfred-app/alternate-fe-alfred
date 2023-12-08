'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ApplyJobForm() {
  const router = useRouter();
  const { id } = router.query;

  // Yup & react hook form setup
  const schema = yup.object({
    priceOnBid: yup.number().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  // Handle submit
  const submitNewJob = (data: any) => {
    const token = localStorage.getItem('token');
    const talentID = localStorage.getItem('userId');

    if (!token || !talentID) {
      alert('You must be logged in as a talent to submit a bid');
      return;
    }

    try {
      const response = axios.post(
        `https://alfred-server.up.railway.app/bidlist/create/${id}`,
        {
          ...data,
          talentID: talentID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      router.push(`/job-detail/${id}`);
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Error submitting bid. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitNewJob)}
      className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 p-10 px-5 border border-gray-200 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-10"
    >
      <div className="w-full flex flex-col gap-8">
        {/* Harga */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="priceOnBid" className="font-medium sm:text-lg">
            Harga
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-5">IDR</span>
            <input
              {...register('priceOnBid')}
              type="number"
              min="0.01"
              step="0.01"
              placeholder="ex. 10000"
              className="w-full pl-14 px-6 py-3 rounded-full border border-gray-300"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="px-7 py-3 font-medium rounded-full border border-gray-300 text-white bg-[#5F4BDB]"
          >
            Taruh Bid
          </button>
        </div>
      </div>
    </form>
  );
}
