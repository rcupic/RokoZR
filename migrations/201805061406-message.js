'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdBy: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id"
          }
      },
      sentTo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id"
          }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('messages');
  }
};
