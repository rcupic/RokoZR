'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('creditCards', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
          pin: {
              type: Sequelize.INTEGER,
              allowNull: false
          },
          userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
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
    return queryInterface.dropTable('creditCards');
  }
};