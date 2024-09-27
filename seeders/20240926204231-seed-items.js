"use strict";

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { tableName: "items", schema: process.env.DB_SCHEMA },
      [
        {
          id_item: uuidv4(),
          name: "Item 1",
        },
      ],
      {}
    );
  },
};
