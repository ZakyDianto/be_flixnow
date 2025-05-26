'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('films', 'author', {
      type: Sequelize.STRING,
      allowNull: true, // atau false kalau wajib diisi
      defaultValue: 'active' // opsional
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('films', 'author');
  }
};
