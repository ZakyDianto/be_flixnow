'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('orders', 'memberID', 'userID');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('orders', 'userID', 'memberID');
  }
};
