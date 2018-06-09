'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    },
    sentTo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  message.associate = function(models) {
    message.belongsTo(models.user,{foreignKey: 'createdBy',as: 'creator'});
    message.belongsTo(models.user,{foreignKey: 'sentTo',as: 'messageTo'});
  };
  return message;
};
