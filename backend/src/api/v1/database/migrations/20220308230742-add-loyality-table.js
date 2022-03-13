'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LoyaltyPoints', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      value: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('LoyaltyPoints');
  }
};
