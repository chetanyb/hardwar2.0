const Lands = require("../models/lands");

exports.landsAdd = async (req, res) => {
  const { id, area, country, latitude, longitude } = req.body;
  try {
    const land = await Lands.create({
      user_id: id,
      land_area: area,
      country: country,
      latitude: latitude,
      longitude: longitude,
    });
    res.status(200).json(land);
  } catch (error) {
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
