"use strict";

require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { tableName: "missions", schema: process.env.DB_SCHEMA },
      [
        {
          name: "Mission 1",
          id_chapter: 1,
        },
        {
          name: "Mission 2",
          id_chapter: 1,
        },
        {
          name: "Finished",
          id_chapter: 2,
        },
      ],
      {}
    );
  },
};
