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
            PeakPrices.hasMany(models.Booking, {
                foreignKey: 'PeakPriceId',
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
        percent: DataTypes.INTEGER,
        date: DataTypes.DATE,
        dayPattern: DataTypes.STRING,
        cancelled: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'PeakPrices',
    });
    return PeakPrices;
};
