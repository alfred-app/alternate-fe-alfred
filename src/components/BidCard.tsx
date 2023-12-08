import React from 'react';
import { useRouter } from 'next/router';

interface CardProps {
  id: string;
  talentID: string;
  priceOnBid: number;
  jobID: string;
  onClick: () => void;
}

const BidCard: React.FC<CardProps> = ({
  id,
  talentID,
  priceOnBid,
  jobID,
  onClick,
}) => {
  return (
    <div
      className="border rounded shadow-lg p-4 mb-4 cursor-pointer"
      onClick={onClick}
    >
      <p>
        <strong>Talent ID:</strong> {talentID}
      </p>
      <p>
        <strong>Price on Bid:</strong> {priceOnBid}
      </p>
      <p>
        <strong>Job ID:</strong> {jobID}
      </p>
    </div>
  );
};

export default BidCard;
