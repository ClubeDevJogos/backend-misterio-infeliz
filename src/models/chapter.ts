import { DataTypes } from "sequelize";
import database from "../database";

const chapter = database.define(
  "chapter",
  {
    id_chapter: {
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

export default chapter;
