'use strict';
module.exports = (sequelize, DataTypes) => {
  const ad = sequelize.define('ad', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    donations: {
      type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  ad.associate = function(models) {
      ad.belongsTo(models.user,{foreignKey: 'userId'});
  };
  return ad;
};
