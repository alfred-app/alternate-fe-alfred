import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoleButton from "../../../components/RoleButton";
import BidCard from "../../../components/BidCard";

interface Job {
  id: string;
  clientID: string;
  name: string;
  descriptions: string;
  address: string;
  imageURL: string;
}

interface Bid {
  talentID: string;
  priceOnBid: number;
  jobID: string;
}

const JobDetailPage: React.FC = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

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
      }
      setIsLoading(false);
    };

    const fetchBids = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await fetch(
          `https://alfred-server.up.railway.app/bidlist/job/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bids");
        }

        const bidsData = await response.json();
        setBids(bidsData);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    if (id) {
      fetchJobDetail();
      fetchBids();
    }
  }, [id, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>Job not found or you do not have access to view this job.</p>;
  }

  const renderBids = () => {
    return bids.map((bid, index) => (
      <BidCard
        key={index}
        talentID={bid.talentID}
        priceOnBid={bid.priceOnBid}
        jobID={bid.jobID}
      />
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{job.name}</h1>
      <p>{job.descriptions}</p>
      <p>Address: {job.address}</p>
      <p>Client ID: {job.clientID}</p>
      {/* {job.imageURL && (
        <Image src={job.imageURL} alt={job.name} width={500} height={300} />
      )} */}
      {role && <RoleButton role={role} jobId={job.id} />}
      <div className="bids-container bg-white">
        <h2 className="text-2xl font-bold my-4">Lamaran</h2>
        {renderBids()}
      </div>
    </div>
  );
};

export default JobDetailPage;
