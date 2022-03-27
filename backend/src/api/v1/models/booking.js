'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            Booking.belongsTo(models.Hotel,{
                foreignKey: 'HotelId',
                onDelete: 'CASCADE'
            });
            Booking.belongsTo(models.User,{
                foreignKey: 'UserId',
                onDelete: 'CASCADE'
            });
            Booking.belongsTo(models.PeakPrices,{
                foreignKey: 'PeakPriceId',
                onDelete: 'CASCADE'
            });
        }
    }
    Booking.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        totalPrice: DataTypes.INTEGER,
        roomsData: DataTypes.JSONB,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};
