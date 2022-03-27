'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Rooms', 'HotelId', {
      type: Sequelize.UUID,
      references: {
        model: 'Hotels',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Rooms', 'HotelId')
  }
};
