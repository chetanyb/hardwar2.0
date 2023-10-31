const express = require("express");
const router = express.Router();
const { fetchSensorData } = require("../controllers/sensorDataController");

router.get("/read", fetchSensorData);

module.exports = router;
