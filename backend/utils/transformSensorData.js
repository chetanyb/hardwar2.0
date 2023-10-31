const transformSensorData = (data) => {
  const transformedData = data.map((item) => {
    const timestamp = item._time;
    return {
      time: timestamp,
      Nitrogen: item._field === "nitrogen" ? item._value : null,
      Phosphorus: item._field === "phosphorus" ? item._value : null,
      Potassium: item._field === "potassium" ? item._value : null,
      temperature: item._field === "temperature" ? item._value : null,
      soilMoisture: item._field === "humidity" ? item._value : null,
      waterPh: item._field === "ph_value" ? item._value : null,
    };
  });

  const mergedData = {};
  transformedData.forEach((item) => {
    const time = item.time;
    if (!mergedData[time]) {
      mergedData[time] = item;
    } else {
      Object.keys(item).forEach((key) => {
        if (item[key] !== null) {
          mergedData[time][key] = item[key];
        }
      });
    }
  });

  const finalData = Object.values(mergedData);
  finalData.sort((a, b) => new Date(b.time) - new Date(a.time));

  return finalData;
};

module.exports = transformSensorData;
