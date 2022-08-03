'use strict';
const { Spot } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */

    await queryInterface.bulkInsert('Spots', [
      {
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
      },
      {
        ownerId: 2,
        address: '550 N. College Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645359,
        lng: -122.4730328,
        name: "App Academyy",
        description: "Place where web developers are created",
        price: 125
      },
      {
        ownerId: 3,
        address: '680 Point Lobos Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645360,
        lng: -122.4730329,
        name: "Lands End Lookout",
        description: "Place where web developers are created",
        price: 135
      },
      {
        ownerId: 4,
        address: '127 Disneeyy Laane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645560,
        lng: -122.4731429,
        name: "Aappp Aacademyy",
        description: "Place where web developers are created",
        price: 140
      },
      {
        ownerId: 5,
        address: '1130 W Monroe St',
        city: 'Chicago',
        state: 'Illionis',
        country: 'United States of America',
        lat: 37.7645564,
        lng: -122.4731430,
        name: "WNDR Museum",
        description: "Multi-sensory, contemporary installations by artist",
        price: 199
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
