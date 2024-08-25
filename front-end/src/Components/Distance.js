import React, { useState } from "react";

const API_KEY = "AIzaSyA-MRj2eDVgcHiGggfhYFGRD_gGdnGqo3A"; // Replace with your API key

const LocationComponent = () => {
  const [location, setLocation] = useState({ lat: null, lon: null, name: "" });
  const [error, setError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation({ lat, lon, name: "" });
    fetchLocationName(lat, lon);
  };

  const fetchLocationName = (lat, lon) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const name = data.results[0].formatted_address;
          setLocation((prev) => ({ ...prev, name }));
        } else {
          setError("Location name not found.");
        }
      })
      .catch((err) => setError("Error fetching location name."));
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An error occurred.");
    }
  };

  return (
    <div>
      <h1>Your Location</h1>
      <button onClick={getLocation}>Get Location</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location.lat && (
        <p>
          Latitude: {location.lat}
          <br />
          Longitude: {location.lon}
          <br />
          Location: {location.name}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
