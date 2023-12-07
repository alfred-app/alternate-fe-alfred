

import React from 'react';
import { useRouter } from 'next/router';

const EditJobPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Job </h1>
      <h1 className="text-l font-medium mb-4">Id pekerjaan {id}</h1>
      <h1 className="text-l font-medium mb-4">Form: </h1>
      {/* Form to edit the job will go here */}
    </div>
  );
};

export default EditJobPage;
