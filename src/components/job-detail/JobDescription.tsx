import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function JobDescription({ data }: { data: any }) {
  const { id, name, descriptions, address } = data;

  const role = localStorage.getItem('role');

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
      if (!data.address) {
        console.error('Alamat pekerjaan kosong');
        return;
      }

      try {
        const position = await getCurrentLocation();
        const { latitude: currentLat, longitude: currentLng } = position.coords;

        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          data.address,
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
  }, [data.address, mapboxToken]);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-10 p-10 px-5 rounded-2xl shadow-lg -translate-y-32 bg-white sm:px-7">
      {/* Edit / Apply Button */}
      <div className="w-full flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col justify-center gap-1">
          <h2 className="text-xl font-semibold md:text-2xl">{name}</h2>
          {/* <span className="text-sm text-gray-500">5 jam yang lalu</span> */}
        </div>

        {role === 'client' ? (
          <Link
            href={`/job-detail/${id}/edit`}
            className="px-5 py-3 text-sm font-medium rounded-full text-white bg-[#5F4BDB]"
          >
            Edit Kerjaan
          </Link>
        ) : (
          <Link
            href={`/job-detail/${id}/lamar`}
            className="px-5 py-3 text-sm font-medium rounded-full text-white bg-[#5F4BDB]"
          >
            Taruh Bid
          </Link>
        )}
      </div>

      {/* Distance */}
      <div className="w-full flex flex-col items-left gap-5 sm:flex-row sm:justify-center sm:gap-10 md:justify-start">
        {/* <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-400"></div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">74</span>
            <p className="text-sm font-light text-gray-500">Pelamar</p>
          </div>
        </div> */}

        {/* <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-400"></div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">3 jam</span>
            <p className="text-sm font-light text-gray-500">Sisa Waktu</p>
          </div>
        </div> */}

        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-400"></div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">{distance}</span>
            <p className="text-sm font-light text-gray-500">Jarak</p>
          </div>
        </div>
      </div>

      {/* Alamat */}
      <div className="w-full flex flex-col gap-3">
        <span className="font-semibold">Alamat</span>
        <p className="text-sm text-gray-500">{address}</p>
      </div>

      {/* Job Description */}
      <div className="w-full flex flex-col gap-3">
        <span className="font-semibold">Deskripsi Pekerjaan</span>
        <p className="text-sm text-gray-500">
          {!descriptions ? 'N/A' : descriptions}
        </p>
      </div>

      {/* Gallery */}
      {/* <div className="relative w-full flex flex-col gap-3">
        <span className="font-semibold">Gallery</span>
        <div className="w-full h-32"></div>
        <div className="absolute top-11 w-full flex items-center justify-start gap-5 overflow-x-auto">
          <div className="min-w-[200px] h-32 rounded-xl bg-gray-600"></div>
        </div>
      </div> */}
    </div>
  );
}
