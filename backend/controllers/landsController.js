const axios = require("axios");
const Lands = require("../models/lands");

exports.landsAdd = async (req, res) => {
  const { id, area, country, latitude, longitude, polygonCoordinates } =
    req.body;
  try {
    const land = await Lands.create({
      user_id: id,
      land_area: area,
      country: country,
      latitude: latitude,
      longitude: longitude,
      polygon_coordinates: polygonCoordinates,
    });
    const land_id = land.land_id;
    const appid = process.env.AGRO_MONITOR_API_KEY;
    const polygonUrl = `http://api.agromonitoring.com/agro/1.0/polygons?appid=${appid}`;

const requestPayload = {
  name: `${id}+${land_id}`,
  geo_json: {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [polygonCoordinates],
    },
  },
};

const polygonResponse = await axios.post(polygonUrl, requestPayload);

    console.log(`polygonResponse: ${JSON.stringify(polygonResponse.data)}`);
    const polygonData = polygonResponse.data;
    console.log(polygonData);
    const polygonId = polygonData.id;

    //adding polygon id to database
    const landWithPolygonId = await Lands.update(
      {
        polygon_id: polygonId,
      },
      {
        where: {
          land_id: land_id,
        },
      }
    );

    const response = {
      land: land,
      polygonId: polygonId,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.findLand = async (req, res) => {
  const { id } = req.params;
  try {
    const land = await Lands.findOne({
      where: {
        user_id: id,
      },
    });
    res.status(200).json(land);
  } catch (error) {
    res.status(500).send(error);
  }
};
