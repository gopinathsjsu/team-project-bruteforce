'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PeakPrices extends Model {
        static associate(models) {
            PeakPrices.belongsTo(models.Hotel, {
                foreignKey: 'HotelId',
                onDelete: 'CASCADE'
            });
        }
    }
    PeakPrices.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: DataTypes.STRING,
        hikePercent: DataTypes.INTEGER,
        date: DataTypes.DATE,
        dayPattern: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PeakPrices',
    });
    return PeakPrices;
};
