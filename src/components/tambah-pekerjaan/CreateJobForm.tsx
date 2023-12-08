'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CreateJobForm() {
  const router = useRouter();

  // Yup & react hook form setup
  const schema = yup.object({
    name: yup.string().required('Judul diperlukan'),
    descriptions: yup.string().required('Deskripsi pekerjaan diperlukan'),
    address: yup.string().required('Alamat diperlukan'),
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
  const submitNewJob = async (data: any) => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `https://alfred-server.up.railway.app/job/create-job/${userId}`,
        { ...data, imageURL: 'empty' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-3 sm:px-8">
      <form
        onSubmit={handleSubmit(submitNewJob)}
        className="w-full max-w-5xl flex flex-col items-center justify-center gap-5 p-10 px-5 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-10"
      >
        <div className="w-full flex flex-col gap-8">
          {/* Name */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name" className="font-medium sm:text-lg">
              Judul
            </label>
            <input
              {...register('name')}
              placeholder="ex. perbaikan AC"
              className="w-full px-6 py-3 rounded-full border border-gray-300"
            />
            <span className="h-5 text-sm text-red-600">
              {errors.name?.message}
            </span>
          </div>

          <div className="w-full flex flex-col gap-5 md:flex-row">
            {/* Address */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="address" className="font-medium sm:text-lg">
                Alamat
              </label>
              <input
                {...register('address')}
                placeholder="..."
                className="w-full px-6 py-3 rounded-full border border-gray-300"
              />
              <span className="h-5 text-sm text-red-600">
                {errors.address?.message}
              </span>
            </div>
          </div>

          {/* Descriptions */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="descriptions" className="font-medium sm:text-lg">
              Deskripsi Pekerjaan
            </label>
            <textarea
              {...register('descriptions')}
              placeholder="..."
              rows={8}
              className="w-full px-6 py-3 text-sm rounded-2xl border resize-none border-gray-300"
            />
            <span className="h-4 text-sm text-red-600">
              {errors.descriptions?.message}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="px-12 py-3 font-medium rounded-full border border-gray-300 text-white bg-[#5F4BDB]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
