'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PeakPrices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      percent: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      dayPattern: {
        type: Sequelize.STRING
      },
      HotelId: {
        type: Sequelize.UUID,
        references: {
          model: 'Hotels',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PeakPrices');
  }
};
