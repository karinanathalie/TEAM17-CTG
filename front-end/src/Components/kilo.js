import React, { useState, useEffect } from "react";
import axios from "axios";

const DistanceCalculator = () => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    calculateDistance(); // Automatically call the function on component mount
  }, []);
  const calculateDistance = async () => {
    const apiKey = "AIzaSyA-MRj2eDVgcHiGggfhYFGRD_gGdnGqo3A";
    const origin = "37.7749,-122.4194"; // San Francisco
    const destination = "34.0522,-118.2437"; // Los Angeles

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&origins=40.6655101%2C-73.89188969999998&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const result = response.data;
      const distanceInMeters = result.rows[0].elements[0].distance.text;
      setDistance(distanceInMeters);
      console.log(distanceInMeters);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <h2>Distance Calculator</h2>
      {distance !== null && <p>Distance: {distance} meters</p>}{" "}
      {/* Display distance */}
    </div>
  );
};

export default DistanceCalculator;
