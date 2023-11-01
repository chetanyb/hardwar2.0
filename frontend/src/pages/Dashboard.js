import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NPKChart from "../components/NPKChart";
import SoilTemperatureChart from "../components/SoilTemperatureChart";
import SoilMoistureChart from "../components/SoilMoistureChart";
import WaterPhChart from "../components/WaterPhChart";
/*import WeatherForecastChart from "./WeatherForecastChart";
import CurrentWeatherChart from "./CurrentWeatherChart";*/

function Dashboard() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/sensor/read");
    const fetchedData = await response.json();
    setData(fetchedData);
    /*const numPoints = 12;
    const currentTime = new Date().getTime();
    const newData = Array.from({ length: numPoints }, (_, index) => ({
      time: new Date(currentTime - index * 3600000).toISOString(),
      Nitrogen: Math.floor(Math.random() * 100),
      Phosphorus: Math.floor(Math.random() * 100),
      Potassium: Math.floor(Math.random() * 100),
      temperature: Math.floor(Math.random() * 100),
      soilMoisture: Math.floor(Math.random() * 100),
      waterPh: Math.floor(Math.random() * 100),
    }));
    setData(newData);*/
  };

  useEffect(() => {
    fetchData(); // Fetch data immediately on component mount
    const intervalId = setInterval(fetchData, 5000); // Then every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <Header />
      <div className="dashboard" style={{ width: "100%", height: "100%" }}>
        <NPKChart data={data} />
        <SoilTemperatureChart data={data} />
        <SoilMoistureChart data={data} />
        <WaterPhChart data={data} />
        {/*<WeatherForecastChart data={data.weatherForecast} />
  <CurrentWeatherChart data={data.currentWeather} />*/}
      </div>
    </div>
  );
}

export default Dashboard;
