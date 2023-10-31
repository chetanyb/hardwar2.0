const { getSensorsData } = require("../utils/getSensorData");
const transformSensorData = require("../utils/transformSensorData");

exports.fetchSensorData = async (req, res) => {
  let { limit } = req.query;
  if (limit === undefined) {
    limit = 12;
  }

  try {
    const sensorData = await getSensorsData(limit);
    const formattedData = transformSensorData(sensorData);
    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
