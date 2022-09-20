'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Luffy',
        lastName: 'D Monkey',
        email: 'luffy@user.io',
        username: 'Luffy-Monkey',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Roronoa',
        lastName: 'Zoro',
        email: 'roronoa@user.io',
        username: 'Roronoa-Zoro',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Robin',
        lastName: 'Nico',
        email: 'robin@user.io',
        username: 'Nico-Robin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Chopper',
        lastName: 'Tony',
        email: 'chopper@user.io',
        username: 'Chopper-Tony',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ace',
        lastName: 'Portgas',
        email: 'ace@user.io',
        username: 'Ace-Portgas',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
