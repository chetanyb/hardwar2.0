const { DataTypes } = require("sequelize");
const cockroach = require("../config/sequelize");

const Lands = cockroach.define(
  "lands",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    land_area: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "lands",
  }
);

module.exports = Lands;
