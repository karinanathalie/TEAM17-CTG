import React, { useState, useEffect } from "react";
import axios from "axios";
import { SwipingCard } from "./SwipingCard";

const DistanceCalculator = ({ lat, lon }) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      calculateDistance(); // Call the function if lat and lon are available
    }
  }, [lat, lon]);

  const calculateDistance = async () => {
    const API_KEY = "AIzaSyA-MRj2eDVgcHiGggfhYFGRD_gGdnGqo3A";
    const origin = `${lat},${lon}`;
    const destination = "34.0522,-118.2437"; // Los Angeles

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const result = response.data;
      const distanceInMeters = result.rows[0].elements[0].distance.value;
      setDistance(distanceInMeters);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <SwipingCard distance={distance} />
    </div>
  );
};

export default DistanceCalculator;
