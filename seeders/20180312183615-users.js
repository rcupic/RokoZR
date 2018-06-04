'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {id: 1, username: 'roko', password: 'role',account:2000,balance:0, createdAt: new Date(), updatedAt: new Date()},
      {id: 2, username: 'ante', password: 'antisa',account:2000,balance:0, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  }
};