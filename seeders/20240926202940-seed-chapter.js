"use strict";

require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { tableName: "chapters", schema: process.env.DB_SCHEMA },
      [
        {
          name: "Chapter 1",
        },
      ],
      {}
    );
  },
};
