'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Hotel extends Model {
        static associate(models) {
            Hotel.hasMany(models.Room, {
                foreignKey: 'HotelId',
                onDelete: 'CASCADE'
            })
            Hotel.hasMany(models.PeakPrices, {
                foreignKey: 'HotelId',
                onDelete: 'CASCADE'
            })
            Hotel.hasMany(models.Booking, {
                foreignKey: 'HotelId',
                onDelete: 'CASCADE'
            })
        }
    }
    Hotel.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Hotel',
    });
    return Hotel;
};
