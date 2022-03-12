'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Amenities extends Model {
        static associate(models) {
            Amenities.belongsTo(models.Room, {
                foreignKey: 'RoomId',
                onDelete: 'CASCADE'
            })
        }
    }

    Amenities.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Amenities',
    });
    return Amenities;
};
