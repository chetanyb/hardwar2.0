const { influxDBClient } = require("../config/influx");
require("dotenv").config();

const getSensorsData = async (limit) => {
  const queryApi = influxDBClient.getQueryApi(process.env.INFLUXDB_ORG);
  try {
    query = `
  from(bucket: "${process.env.INFLUXDB_BUCKET}")
    |> range(start: -30d)
    |> filter(fn: (r) => r._measurement == "environment")
    |> sort(columns: ["_time"], desc: true)
    |> limit(n: ${limit})
`;

    const result = await queryApi.collectRows(query);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
    return error.message;
  }
};

exports.getSensorsData = getSensorsData;
