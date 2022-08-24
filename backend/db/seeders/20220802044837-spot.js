'use strict';
const { Spot } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {


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
        price: 123,
        previewImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
        price: 125,
        previewImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
        price: 135,
        previewImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80"
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
        price: 140,
        previewImage: "https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
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
        price: 199,
        previewImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
