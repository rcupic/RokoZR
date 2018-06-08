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
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    donations: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull:false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  ad.associate = function(models) {
      ad.belongsTo(models.user,{foreignKey: 'userId',as:'adOwner'});
  };
  return ad;
};
