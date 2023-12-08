import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Job {
  id: string;
  clientID: string;
  name: string;
  description: string;
  address: string;
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [distance, setDistance] = useState<string | null>(null);
  const router = useRouter();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  useEffect(() => {
    const calculateDistance = async () => {
      if (!job.address) {
        console.error("Alamat pekerjaan kosong");
        return;
      }

      try {
        const position = await getCurrentLocation();
        const { latitude: currentLat, longitude: currentLng } = position.coords;

        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(job.address)}.json?access_token=${mapboxToken}`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        const coordinates = geocodingData.features[0]?.geometry?.coordinates;
        if (!coordinates || coordinates.length !== 2) {
          throw new Error("Koordinat alamat pekerjaan tidak ditemukan");
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

    calculateDistance();
  }, [job.address, mapboxToken]);

  const handleCardClick = () => {
    router.push(`/job-detail/${job.id}`);
  };

  return (
    <div onClick={handleCardClick} className="bg-white rounded-lg border border-gray-200 shadow-md p-4 max-w-sm mx-auto my-4 cursor-pointer">
      <h3 className="text-lg font-semibold">{job.name}</h3>
      <p className="text-gray-800 mt-2">{job.description}</p>
      <div className="mt-4">
        <p className="text-gray-600 text-sm">Client ID: {job.clientID}</p>
        <p className="text-gray-600 text-sm">Address: {job.address}</p>
        {distance ? (
          <p className="text-blue-600 text-sm">Estimated Distance: {distance}</p>
        ) : (
          <p className="text-red-600 text-sm">Distance: Not available</p>
        )}
      </div>
    </div>
  );
};

export default JobCard;
