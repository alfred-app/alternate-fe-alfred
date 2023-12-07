import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// Definisikan interface untuk data Job
interface Job {
  id: string;
  clientID: string;
  name: string;
  descriptions: string;
  address: string;
  imageURL: string;
}

const JobDetailPage = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchJobDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Redirecting to login...");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://alfred-server.up.railway.app/job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch job detail");
        }

        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
      setIsLoading(false);
    };

    if (id) {
      fetchJobDetail();
    }
  }, [id, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>Job not found or you do not have access to view this job.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{job.name}</h1>
      <p>{job.descriptions}</p>
      <p>Address: {job.address}</p>
      <p>Client ID: {job.clientID}</p>
      {/* ini untuk image */}
      {/* {job.imageURL && (
        <Image src={job.imageURL} alt={job.name} width={500} height={300} />
      )} */}
    </div>
  );
};

export default JobDetailPage;
