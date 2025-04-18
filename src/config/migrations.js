const configDotenv = require("dotenv").config;

configDotenv();

module.exports = {
  development: {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
  },
};
