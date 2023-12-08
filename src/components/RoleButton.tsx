import React from 'react';
import { useRouter } from 'next/router';

interface RoleButtonProps {
  role: string;
  jobId: string;
}

const RoleButton: React.FC<RoleButtonProps> = ({ role, jobId }) => {
  const router = useRouter();

  const handleAction = () => {
    if (role === 'talent') {
      router.push(`/job-detail/${jobId}/lamar`);
    } else if (role === 'client') {
      router.push(`/job-detail/${jobId}/edit`);
    }
  };

  const buttonText = role === 'talent' ? 'Lamar' : 'Edit';
  const buttonStyles =
    role === 'talent'
      ? 'bg-blue-500 hover:bg-blue-600'
      : 'bg-green-500 hover:bg-green-600';

  return (
    <button
      className={`px-4 py-2 text-white rounded ${buttonStyles}`}
      onClick={handleAction}
    >
      {buttonText}
    </button>
  );
};

export default RoleButton;
