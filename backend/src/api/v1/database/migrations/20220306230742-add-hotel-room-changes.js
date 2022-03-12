'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Room', 'HotelId', {
      type: Sequelize.UUID,
      references: {
        model: 'Hotels',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Room', 'HotelId')
  }
};
