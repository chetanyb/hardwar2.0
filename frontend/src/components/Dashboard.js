import React, { useEffect, useState } from "react";
import NPKChart from "./NPKChart";
import SoilTemperatureChart from "./SoilTemperatureChart";
import SoilMoistureChart from "./SoilMoistureChart";
import WaterPhChart from "./WaterPhChart";
import Map from "./Maps";
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
    <div className="dashboard" style={{ width: "100%", height: "100%" }}>
      {/*<WeatherForecastChart data={data.weatherForecast} />
  <CurrentWeatherChart data={data.currentWeather} />*/}
    </div>
  );
}

export default Dashboard;
