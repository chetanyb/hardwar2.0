const { InfluxDB } = require("@influxdata/influxdb-client");
require("dotenv").config();

const influxConfig = {
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
};

const influxDBClient = new InfluxDB(influxConfig);

module.exports = { influxDBClient };
