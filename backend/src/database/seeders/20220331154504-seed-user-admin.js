'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      password: '$2a$08$hapg6Uio4MHrrJxWYYM8seKYvDgBKiWxBc00lmgzYhX3AoU0K6yBK',
      phone: '11987654321',
      email: 'admin@starwars.com',
      createdAt: new Date(),
    },], {});  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});  }
};
