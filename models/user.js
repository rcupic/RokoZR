'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    account: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  user.associate = function(models) {
    user.hasMany(models.ad,{foreignKey: 'userId',as: 'adOwner'});
    user.hasMany(models.message,{foreignKey: 'sentTo',as: 'messageTo'});
    user.hasMany(models.message,{foreignKey: 'createdBy',as: 'creator'});
    user.hasOne(models.lastReading,{foreignKey: 'userId',as: 'userLogin'});
};
  return user;
};
