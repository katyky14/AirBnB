'use strict';
const { Spot } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */

    await queryInterface.bulkInsert('Spots', [{
      ownerId: 1,
      address: '123 Disney Lane',
      city: 'San Francisco',
      state: 'California',
      country: 'United States of America',
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};