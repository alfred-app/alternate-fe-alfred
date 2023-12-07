import React, { useState } from "react";
import { useRouter } from "next/router";

const LamarJobPage: React.FC = () => {
  const [priceOnBid, setPriceOnBid] = useState("");
  const router = useRouter();
  const { id: jobId } = router.query; // Extracting job ID from the URL

  const submitBid = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const talentID = localStorage.getItem("userId"); // Replace 'userId' with the correct localStorage key for the talent ID

    // Check if the token and talentID are available
    if (!token || !talentID) {
      alert("You must be logged in to submit a bid.");
      return;
    }

    try {
      const response = await fetch(
        `https://alfred-server.up.railway.app/bidlist/create/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure this is what your API expects
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            talentID: talentID,
            priceOnBid: Number(priceOnBid),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit bid");
      }

      const result = await response.json();
      console.log(result);
      alert("Bid submitted successfully!");
      // Additional handling such as redirecting the user or updating the UI
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Error submitting bid. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Submit a Bid for Job {jobId}</h1>
      <form onSubmit={submitBid}>
        <div className="mb-4">
          <label
            htmlFor="priceOnBid"
            className="block text-gray-700 text-sm font-bold mb-2">
            Your Bid Price
          </label>
          <input
            type="number"
            id="priceOnBid"
            value={priceOnBid}
            onChange={(e) => setPriceOnBid(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default LamarJobPage;
