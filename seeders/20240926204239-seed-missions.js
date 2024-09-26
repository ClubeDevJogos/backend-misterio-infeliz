"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "missions",
      [
        {
          name: "Mission 1",
          id_chapter: 1,
        },
      ],
      {}
    );
  },
};
