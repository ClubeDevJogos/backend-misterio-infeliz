import { DataTypes } from "sequelize";
import database from "../database";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

const user = database.define(
  "user",
  {
    id_user: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

user.beforeSave(async (user) => {
  const password = user.get("password") as string;

  if (password) {
    user.set("password", await hash(password, 8));
  }
});

export default user;
