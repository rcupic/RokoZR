'use strict';
module.exports = (sequelize, DataTypes) => {
  const lastReading = sequelize.define('lastReading', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  lastReading.associate = function(models) {
    lastReading.belongsTo(models.user,{foreignKey: 'userId',as:'userLogin'});
  };
  return lastReading;
};
