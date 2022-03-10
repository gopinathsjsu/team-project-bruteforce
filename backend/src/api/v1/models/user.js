'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Many to many with the Permissions
            User.belongsToMany(models.Permission, {through: 'UsersPermission'})
            models.Permission.belongsToMany(User, {through: 'UsersPermission'})
            // Many to many relation with the Role table
            User.belongsToMany(models.Role, {through: 'UsersRole'})
            models.Role.belongsToMany(User, {through: 'UsersRole'})
            // Many to many relation with the UserGroup table
            User.belongsToMany(models.UserGroup, {through: 'UsersUserGroup'})
            models.UserGroup.belongsToMany(User, {through: 'UsersUserGroup'})
        }
    }
    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        verified: DataTypes.BOOLEAN,
        isArchived: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
