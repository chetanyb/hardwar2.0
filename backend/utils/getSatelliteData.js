const { Op } = require("sequelize");
const Land = require("../models/lands");
const { getCreditValue } = require("./getCreditValues");
const axios = require("axios");
require("dotenv").config();

const getLandData = async (userId) => {
  const land = await Land.findOne({
    where: {
      user_id: userId,
      polygon_id: {
        [Op.not]: null,
      },
    },
  });
  return land;
};

const getSatelliteData = async (userId) => {
  const apiKey = process.env.OPENWEATHERMAPS_KEY;
  const landData = await getLandData(userId);
  console.log(`landData: ${landData}`);
  const { polygon_id, latitude, longitude, country, land_area } = landData;
  const urlRain = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,alerts&appid=${apiKey}`;
  const creditValue = await getCreditValue(country, land_area);
  const responseRain = await axios.get(urlRain);
  const weatherData = await responseRain.data;
  const currentTemp = weatherData.current.temp;
  const currentHumidity = weatherData.current.humidity;
  const currentWeather = weatherData.current.weather[0].description;
  const icon = `http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`;
  const rainChancesNextHour = weatherData.hourly[1].pop;
  const agriData = await getAgriData(polygon_id, latitude, longitude);
  const { currentUvi, latestMedianNDVI, colourCode, windSpeed, windDeg, windGust, message } = agriData;
  return {
    creditValue: creditValue,
    currentUvi: currentUvi,
    latestMedianNDVI: latestMedianNDVI,
    colourCode: colourCode,
    windSpeed: windSpeed,
    windDeg: windDeg,
    windGust: windGust,
    message: message,
    currentTemp: currentTemp,
    currentHumidity: currentHumidity,
    currentWeather: currentWeather,
    icon: icon,
    rainChancesNextHour: rainChancesNextHour,
  };
};

const getAgriData = async (polygon_id, latitude, longitude) => {
  const agriKey = process.env.AGRO_MONITOR_API_KEY;
  const id = polygon_id;
  const lat = latitude;
  const lon = longitude;
  const endTime = Math.round(+new Date() / 1000);
  const startTime = endTime - 15 * 86400;
  const urlNDVIAgri = `http://api.agromonitoring.com/agro/1.0/ndvi/history?start=${startTime}&end=${endTime}&polyid=${id}&appid=${agriKey}`;
  const urlUviAgri = `http://api.agromonitoring.com/agro/1.0/uvi?polyid=${id}&appid=${agriKey}`;
  const urlWeatherAgri = `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}}&lon=${lon}&appid=${agriKey}`;
  const responseWeather = await axios.get(urlWeatherAgri);
  const responseNDVI = await axios.get(urlNDVIAgri);
  const responseUvi = await axios.get(urlUviAgri);
  const NDVIData = await responseNDVI.data;
  const UviData = await responseUvi.data;
  const weatherData = await responseWeather.data;
  const windData = weatherData.wind;
  const currentUvi = UviData.uvi;
  const lastestMedianNDVI = NDVIData[0].data.median;
  let colourCode = "";
  let message = "";
  if (currentUvi < 2) {
    colourCode = "#4671c6";
    message = "Low UV index. No protection required!";
  } else if (currentUvi < 5) {
    colourCode = "#a4c9ff";
    message = "Moderate UV index. Protection required!";
  } else if (currentUvi < 7) {
    colourCode = "#6bdddd";
    message = "Moderate UV index. Protection required!";
  } else if (currentUvi < 10) {
    colourCode = "#ffea92";
    message = "High UV index. Extra protection required!";
  } else if (currentUvi > 10) {
    colourCode = "#f9a7a7";
    message = "Extreme UV index. Extra protection required!";
  }
  return {
    currentUvi: currentUvi,
    latestMedianNDVI: lastestMedianNDVI,
    colourCode: colourCode,
    windSpeed: windData.speed,
    windDeg: windData.deg,
    windGust: windData.gust,
    message: message,
  };
};

exports.getSatelliteData = getSatelliteData;