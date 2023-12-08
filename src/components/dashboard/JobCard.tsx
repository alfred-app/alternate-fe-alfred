import Link from 'next/link';
import { useEffect, useState } from 'react';

type JobCardType = {
  job: {
    id: string;
    clientID: string;
    name: string;
    descriptions: string;
    address: string;
  };
};

export default function JobCard({ job }: JobCardType) {
  const { id, name, descriptions, address } = job;

  const currentRole = localStorage.getItem('role');

  // Geo location setup
  const [distance, setDistance] = useState<string | null>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  useEffect(() => {
    const calculateDistance = async () => {
      if (!job.address) {
        console.error('Alamat pekerjaan kosong');
        return;
      }

      try {
        const position = await getCurrentLocation();
        const { latitude: currentLat, longitude: currentLng } = position.coords;

        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          job.address,
        )}.json?access_token=${mapboxToken}`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();

        const coordinates = geocodingData.features[0]?.geometry?.coordinates;
        if (!coordinates || coordinates.length !== 2) {
          throw new Error('Koordinat alamat pekerjaan tidak ditemukan');
        }

        const [jobLng, jobLat] = coordinates;

        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentLng},${currentLat};${jobLng},${jobLat}?access_token=${mapboxToken}`;
        const directionsResponse = await fetch(directionsUrl);
        const directionsData = await directionsResponse.json();

        const routeDistance = directionsData.routes[0].distance / 1000; // Convert from meters to kilometers
        setDistance(`${routeDistance.toFixed(2)} km`);
      } catch (error) {
        console.error('Error calculating distance:', error);
        setDistance(null); // Reset the distance in case of error
      }
    };

    calculateDistance();
  }, [job.address, mapboxToken]);

  return (
    <div className="w-full p-5 flex flex-col items-center gap-5 rounded-xl border border-gray-100 shadow-lg">
      <div className="w-full flex flex-row items-center gap-5">
        {/* <div className="min-w-[144px] max-w-[144px] h-36 rounded-lg bg-gray-600"></div> */}

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xl line-clamp-3 md:text-2xl sm:line-clamp-1">
            {name}
          </span>

          <span className="text-sm text-[#5F4BDB]">{address}</span>

          <p className="mt-2 text-sm text-gray-500 line-clamp-4 sm:line-clamp-3">
            {descriptions}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-9 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 border-t pt-5 text-sm sm:text-base sm:flex-row sm:items-center sm:border-none sm:pt-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-600"></div>
            {distance ? (
              <span>{distance}</span>
            ) : (
              <span className="text-red-600">N/A</span>
            )}
          </div>

          {/* <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-600"></div>
            <span>0 Lamaran</span>
          </div> */}
        </div>

        <div className="w-full flex justify-between gap-3 md:w-fit md:justify-start">
          <Link
            href={`/job-detail/${id}`}
            className="px-5 py-3 rounded-full font-semibold text-center text-[#FE6D1B] bg-[#FFE8DC]"
          >
            Lihat Detail
          </Link>

          {currentRole === 'talent' && (
            <Link
              href={`/job-detail/${id}/lamar`}
              className="px-5 py-3 rounded-full font-semibold text-center text-[#5F4BDB] bg-[#F0EEFF]"
            >
              Taruh Bid
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
