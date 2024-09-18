import { DataTypes } from "sequelize";
import database from "../database";
import { v4 as uuidv4 } from "uuid";

const item = database.define(
  "item",
  {
    id_item: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
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

export default item;
