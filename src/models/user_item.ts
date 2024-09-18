import { DataTypes } from "sequelize";
import database from "../database";
import { v4 as uuidv4 } from "uuid";

const user_item = database.define(
  "user_item",
  {
    id_user_item: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

export default user_item;
