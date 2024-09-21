import { configDotenv } from "dotenv";

configDotenv();

const authConfig = {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES_IN,
};

export default authConfig;
