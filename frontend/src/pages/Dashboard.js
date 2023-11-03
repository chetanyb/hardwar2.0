import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import NPKChart from "../components/NPKChart";
import SoilTemperatureChart from "../components/SoilTemperatureChart";
import SoilMoistureChart from "../components/SoilMoistureChart";
import WaterPhChart from "../components/WaterPhChart";
import { AuthContext } from "../AuthProvider";
import axios from 'axios';
import WeatherBox from "../components/WeatherBox";
import GetLoan from "../components/GetLoan";

function Dashboard() {
  const [data, setData] = useState(null);
  const [satelliteData, setSatelliteData] = useState(null); 
  const { user } = useContext(AuthContext);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/sensor/read");
    const fetchedData = await response.json();
    setData(fetchedData);
  };
const requestPayload = {
  userId: user.id,
};
  const fetchSatelliteData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/satellite/get', requestPayload);
      setSatelliteData(response.data);
    } catch (error) {
      console.error('Error fetching satellite data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSatelliteData(); 
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">NPK Levels</h2>
          <NPKChart data={data} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Soil Temperature</h2>
          <SoilTemperatureChart data={data} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Soil Moisture</h2>
          <SoilMoistureChart data={data} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Water pH Levels</h2>
          <WaterPhChart data={data} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <WeatherBox data={satelliteData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
        <GetLoan data={satelliteData && satelliteData.creditValue} />
      </div>
      </div>
    </div>
  );
}

export default Dashboard;