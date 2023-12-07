import React from 'react';

interface CardProps {
  talentID: string;
  priceOnBid: number;
  jobID: string;
}

const BidCard: React.FC<CardProps> = ({ talentID, priceOnBid, jobID }) => {
  return (
    <div className="border rounded shadow-lg p-4 mb-4">
      <p><strong>Talent ID:</strong> {talentID}</p>
      <p><strong>Price on Bid:</strong> {priceOnBid}</p>
      <p><strong>Job ID:</strong> {jobID}</p>
    </div>
  );
};

export default BidCard;
