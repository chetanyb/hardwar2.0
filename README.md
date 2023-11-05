# HARDWAR 2.0

This is one implementation of a credit assessment platform I made for Hardwar 2.0 hackathon. The platform uses ESP32 along with an NPK sensor, pH sensor and SHT1-10 sensor as the hardware and a cloud based InfluxDB instance and a docker based cockroachdb node. The data inputs are processed to assign credit value to the farmer.

NOTE: To calculate credit value, you have to create getCreditValue function within hardwar2.0/backend/utils/getCreditValues.js

## Requirements

   1. Docker
   2. docker-compose
   3. PlatformIO extension installed
   4. ESP32 microcontroller
   5. SHT-10 sensor
   6. pH Sensor
   7. NPK sensor
   8. MAX485 TTL to RS485 Converter Module
   9. Wires to make the connections

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/chetanyb/hardwar2.0 
2. Navigate to the directory
   ```bash
   cd hardwar2.0/
   ```
3. Setup frontend and backend .env
   ```bash
   touch frontend/.env backend/.env
   ```
4. Create the following variables with appropriate values in your .env:
   - frontend:
      1. ` REACT_APP_MAPBOX_ACCESS_TOKEN  `
   - backend:
      1. ` DB_USER `
      2. ` DB_PASS `
      3. ` DB_NAME `
      4. ` DB_HOST `
      5. ` DB_PORT `
      6. ` JWT_SECRET `
      7. ` INFLUXDB_BUCKET `
      8. ` INFLUXDB_ORG `
      9. ` INFLUXDB_URL `
      10. ` INFLUXDB_TOKEN `
      11. ` OPENWEATHERMAPS_KEY `
      12. ` AGRO_MONITOR_API_KEY `
      13. ` OPENAI_KEY `
5. Create and setup the env.h for sensors
   - ```bash
       touch sensors/lib/env.h
       ```
   - Define the following macros within your env.h file
      1. ` INFLUXDB_TOKEN `
      2. ` INFLUXDB_URL `
      3. ` INFLUXDB_BUCKET `
      4. ` INFLUXDB_ORG `

      NOTE: Here's an example:
      ```bash
       #define INFLUXDB_TOKEN "your_token_here"
       ```
6. Docker-compose
   - Within the hardwar2.0 directory run
      ```bash
      docker-compose up --build
      ```
   - To stop the application run
      ```bash
      docker-compose down
      ```
7. Access your cockroachdb and create new user and fill in the details in your backend/.env
8. Run the database scripts
   ```bash
   node backend/scripts/createuserTable.js
   node backend/scripts/createLandsTable.js
   ```
7. Access the application at your localhost:3000