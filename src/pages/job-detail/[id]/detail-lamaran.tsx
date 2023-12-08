
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface BidDetail {
  id: string;
  talentID: string;
  jobID: string;
  priceOnBid: number;
  bidPlaced: string;
}

const DetailLamaranPage: React.FC = () => {
  const [bidDetail, setBidDetail] = useState<BidDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    const fetchBidDetail = async () => {
      if (!id) return; 

      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Redirecting to login...");
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://alfred-server.up.railway.app/bidlist/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bid detail");
        }

        const bidData = await response.json();
        setBidDetail(bidData);
      } catch (error) {
        console.error("Error:", error);
      }

      setIsLoading(false);
    };

    fetchBidDetail();
  }, [id, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!bidDetail) {
    return <p>Detail lamaran tidak ditemukan.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detail Lamaran</h1>
      <p><strong>Bid ID:</strong> {bidDetail.id}</p>
      <p><strong>Talent ID:</strong> {bidDetail.talentID}</p>
      <p><strong>Job ID:</strong> {bidDetail.jobID}</p>
      <p><strong>Price on Bid:</strong> {bidDetail.priceOnBid}</p>
      <p><strong>Bid Placed:</strong> {bidDetail.bidPlaced}</p>
    </div>
  );
};

export default DetailLamaranPage;
