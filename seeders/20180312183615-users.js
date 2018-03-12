'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {id: 1, username: 'roko', password: 'role', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, username: 'ante', password: 'antisa', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  }
};