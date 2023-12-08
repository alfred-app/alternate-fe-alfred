import TitleBanner from '@/components/shared/TitleBanner';
import CreateJobForm from '@/components/tambah-pekerjaan/CreateJobForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TambahPekerjaanPage = () => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role !== 'client') {
      alert('Fitur khusus client. Mohon login sebagai client');
      router.replace('/client-login');
    }
  });

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 font-poppins">
      <TitleBanner title="Buat Pekerjaan" />

      <CreateJobForm />
    </div>
  );
};

export default TambahPekerjaanPage;
