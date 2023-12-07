import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobCard from "../components/JobCard";
import Button from "../components/Button";

interface Job {
  clientID: string;
  name: string;
  description: string;
  address: string;
  id: string;
}
const DashboardPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://alfred-server.up.railway.app/job/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const handleAddJobClick = () => {
    router.push("/tambah-pekerjaan");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Jobs</h1>
        <Button text="Tambah Pekerjaan" onClick={handleAddJobClick} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading jobs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
