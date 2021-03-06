'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lastReadings', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          time: {
              type: Sequelize.DATE,
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
    return queryInterface.dropTable('lastReadings');
  }
};
