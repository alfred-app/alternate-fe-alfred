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
  const { bidId } = router.query;

  useEffect(() => {
    const fetchBidDetail = async () => {
      if (!bidId) return;

      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Redirecting to login...');
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(
          `https://alfred-server.up.railway.app/bidlist/${bidId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch bid detail');
        }

        const bidData: BidDetail = await response.json();
        setBidDetail(bidData);
      } catch (error) {
        console.error('Error:', error);
      }

      setIsLoading(false);
    };

    fetchBidDetail();
  }, [bidId, router]);

  const acceptBid = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Redirecting to login...');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(
        'https://alfred-server.up.railway.app/job/set-talent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobID: bidDetail?.jobID,
            talentID: bidDetail?.talentID,
            fixedPrice: bidDetail?.priceOnBid,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to accept the bid');
      }

      // Redirect to job detail page on success
      router.push(`/job-detail/${bidDetail?.jobID}`);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message to the user)
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!bidDetail) {
    return <p>Detail lamaran tidak ditemukan.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detail Lamaran</h1>
      <p>
        <strong>Bid ID:</strong> {bidDetail.id}
      </p>
      <p>
        <strong>Talent ID:</strong> {bidDetail.talentID}
      </p>
      <p>
        <strong>Job ID:</strong> {bidDetail.jobID}
      </p>
      <p>
        <strong>Price on Bid:</strong> {bidDetail.priceOnBid}
      </p>
      <p>
        <strong>Bid Placed:</strong> {bidDetail.bidPlaced}
      </p>

      <button
        onClick={acceptBid}
        className="btn-accept bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Accept Lamaran
      </button>
    </div>
  );
};

export default DetailLamaranPage;
