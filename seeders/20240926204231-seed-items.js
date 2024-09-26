"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "items",
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
