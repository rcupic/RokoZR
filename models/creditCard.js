'use strict';
module.exports = (sequelize, DataTypes) => {
  const creditCard = sequelize.define('creditCard', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    pin: {
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
  creditCard.associate = function(models) {
    creditCard.belongsTo(models.user,{foreignKey: 'userId',as:'cardOwner'});
  };
  return creditCard;
};
