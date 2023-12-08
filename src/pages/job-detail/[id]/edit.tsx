import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditJobPage: React.FC = () => {
  const [description, setDescription] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchJobDetail = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authorized to view this page.');
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(
          `https://alfred-server.up.railway.app/job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }

        const jobData = await response.json();
        setDescription(jobData.descriptions);
      } catch (error) {
        console.error('Error fetching job details:', error);
        alert('Error fetching job details.');
      }
    };

    if (id) {
      fetchJobDetail();
    }
  }, [id, router]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not authorized to edit this job.');
      return;
    }

    try {
      const response = await fetch(
        `https://alfred-server.up.railway.app/job/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            descriptions: description,
          }),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error response:', errorResponse);
        throw new Error(
          `Failed to update job: ${response.status} ${response.statusText}`,
        );
      }

      alert('Job updated successfully');
      router.push(`/job-detail/${id}`);
    } catch (error: any) {
      console.error('Error updating job:', error);
      alert(`Error updating job. Please try again. ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Job</h1>
      <h2 className="text-l font-medium mb-4">Job ID: {id}</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
