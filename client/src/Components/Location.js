import React, { useState, useEffect } from "react";
import axios from "axios";

function Location() {
    const [ip, setIp] = useState(null); //State to hold the IP address
  const [country, setCountry] = useState(null); //State to hold geolocation
  const [region, setRegion] = useState(null); // State to hold geolocation
  const getGeoLocationData = async () => {
    try { 
      const response = await axios.get("https://geo.ipify.org/api/v2/country?apiKey=at_mdAijGphXs9dXAKuSaQKeSqTieQuk");
      setIp(response.data.ip);
      setCountry(response.data.location.country); // Set country
      setRegion(response.data.location.region); // Set region
     
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  useEffect(() => {
    getGeoLocationData();
}, []);

  return (
    <div className="bg-white rounded-lg shadow mb-6 p-6">
      <h3 className="text-lg font-semibold text-gray-800">Location Information</h3>
      <div className="mt-4">
        <p><strong>IP Address:</strong> {ip}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>Region:</strong> {region}</p>
      </div>
    </div>
  )
}

export default Location