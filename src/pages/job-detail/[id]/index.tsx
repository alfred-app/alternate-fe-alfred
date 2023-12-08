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
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

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

    const getCurrentLocation = (): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported by your browser"));
        } else {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      });
    };

    const calculateDistance = async () => {
      if (!job || !job.address || role !== "talent") {
        return;
      }

      try {
        const position = await getCurrentLocation();
        const { latitude: currentLat, longitude: currentLng } = position.coords;

        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          job.address
        )}.json?access_token=${mapboxToken}`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        const coordinates = geocodingData.features[0]?.geometry?.coordinates;
        if (!coordinates || coordinates.length !== 2) {
          throw new Error("Job coordinates not found");
        }

        const [jobLng, jobLat] = coordinates;

        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLng},${currentLat};${jobLng},${jobLat}?access_token=${mapboxToken}`;
        const directionsResponse = await fetch(directionsUrl);
        const directionsData = await directionsResponse.json();

        const routeDistance = directionsData.routes[0].distance / 1000; // Convert from meters to kilometers
        setDistance(`${routeDistance.toFixed(2)} km`);
      } catch (error) {
        console.error("Error calculating distance:", error);
        setDistance(null); // Reset the distance in case of error
      }
    };

    if (id) {
      fetchJobDetail();
      fetchBids();
      if (role === "talent") {
        calculateDistance();
      }
    }
  }, [id, job, role, mapboxToken, router]);

  const handleBidCardClick = (jobID: string) => {
    router.push(`/job-detail/${jobID}/detail-lamaran`);
  };

  const renderBids = () => {
    return bids.map((bid, index) => (
      <BidCard
        key={index}
        talentID={bid.talentID}
        priceOnBid={bid.priceOnBid}
        jobID={bid.jobID}
        onClick={() => handleBidCardClick(bid.jobID)} 
      />
    ));
  };

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
      {role === "talent" && distance && (
        <p className="text-blue-600 text-m">Estimated Distance: {distance}</p>
      )}
      {role && <RoleButton role={role} jobId={job.id} />}
      <div className="bids-container bg-white">
        <h2 className="text-2xl font-bold my-4">Lamaran</h2>
        {renderBids()}
      </div>
    </div>
  );
};

export default JobDetailPage;
