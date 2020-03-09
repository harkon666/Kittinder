"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "species",
      [
        {
          name: "Anggora",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Persia",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Scottish",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Brittish",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Domestic",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
