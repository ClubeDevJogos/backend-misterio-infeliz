import { DataTypes } from "sequelize";
import database from "../database";

const feedback = database.define(
  "feedback",
  {
    id_feedback: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default feedback;
