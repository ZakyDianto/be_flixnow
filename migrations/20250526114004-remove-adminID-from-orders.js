'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'adminID');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'adminID', {
      type: Sequelize.INTEGER
    });
  }
};
