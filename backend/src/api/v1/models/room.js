'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        static associate(models) {
            Room.hasMany(models.Amenities, {
                foreignKey: 'RoomId',
                onDelete: 'CASCADE'
            });
            Room.belongsTo(models.Hotel, {
                foreignKey: 'HotelId',
                onDelete: 'CASCADE'
            });
        }
    }
    Room.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        pricePerDay: DataTypes.INTEGER,
        guestPricePerDay: DataTypes.INTEGER,
        freeGuestCount: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Room',
    });
    return Room;
};
