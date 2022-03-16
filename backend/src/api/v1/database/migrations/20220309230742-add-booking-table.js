'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      HotelId: {
        type: Sequelize.UUID,
        references: {
          model: 'Hotels',
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      PeakPriceId: {
        type: Sequelize.UUID,
        references: {
          model: 'PeakPrices',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      roomsData: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      cancelled: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};
