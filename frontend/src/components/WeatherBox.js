import React from "react";
import LoadingAnimation from "./loadingAnimation";

const WeatherBox = ({ data }) => {
  return data ? (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src={data.icon} alt="Weather Icon" />
      </div>
      <div>
       <div className="text-xl font-medium text-black">
    Credit Value: ${data?.creditValue?.toFixed(2)}
</div>
        <p className="text-gray-500">
          UV Index: {data.currentUvi} ({data.message})
        </p>
        <p className="text-gray-500">NDVI: {data.latestMedianNDVI}</p>
        <p className="text-gray-500">
          Wind: {data.windSpeed} km/h at {data.windDeg}° (Gust: {data.windGust}{" "}
          km/h)
        </p>
        <p className="text-gray-500">
    Temperature: {(data?.currentTemp ? (data.currentTemp - 273.15).toFixed(2) : null)}°C
</p>
        <p className="text-gray-500">Humidity: {data.currentHumidity}%</p>
        <p className="text-gray-500">Weather: {data.currentWeather}</p>
        <p className="text-gray-500">
          Rain Chances Next Hour: {data.rainChancesNextHour * 100}%
        </p>
      </div>
    </div>
  ) : (
    <LoadingAnimation />
  );
};

export default WeatherBox;
