import { DataTypes } from "sequelize";
import database from "../database";

const mission = database.define(
  "mission",
  {
    id_mission: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default mission;
