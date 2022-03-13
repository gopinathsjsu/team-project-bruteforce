'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoyaltyPoint extends Model {
        static associate(models) {
            LoyaltyPoint.belongsTo(models.Hotel, {
                foreignKey: 'HotelId',
                onDelete: 'CASCADE'
            });
            LoyaltyPoint.belongsTo(models.User, {
                foreignKey: 'UserId',
                onDelete: 'CASCADE'
            });
        }
    }
    LoyaltyPoint.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        value: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LoyaltyPoint',
    });
    return LoyaltyPoint;
};
