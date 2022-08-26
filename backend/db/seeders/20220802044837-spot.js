'use strict';
const { Spot } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: 'Acorn Falls',
        city: 'Bass Lake',
        state: 'CA',
        country: 'United States',
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: `Welcome to Eagle's Nest, one of the most ideally located Lakefront homes on Bass Lake! Opportunities to see bald eagles and catch fish right from your own boat dock!`,
        price: 698,
        previewImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      },
      {
        ownerId: 2,
        address: 'Beautiful Beachfront Lake Tahoe Home',
        city: 'Morrilton',
        state: 'Arkansas',
        country: 'United States',
        lat: 37.7645359,
        lng: -122.4730328,
        name: "App Academyy",
        description: `Stunning bungalow that is only steps to the sand (one house off the beach). The open layout is perfect for families. Home comes with surf/body boards, bikes and beach chairs `,
        price: 799,
        previewImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      },
      {
        ownerId: 3,
        address: 'Sol to Soul named by Condé Nast: Coolest In Cali',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States',
        lat: 37.7645360,
        lng: -122.4730329,
        name: "Condé Nast",
        description: `We invite you to experience the otherworldly at Sol to Soul, a ten-acre sanctuary in a mystical theater of boulders. Stay up late with the Milky Way. Howl at the moon from atop a boulder. Raise your glass to the sunset and each other from the salt water hot tub. `,
        price: 598,
        previewImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80"
      },
      {
        ownerId: 4,
        address: 'Renovated ski-in/ski-out Holiday Valley',
        city: 'Ellicottville',
        state: 'New York',
        country: 'United States of America',
        lat: 37.7645560,
        lng: -122.4731429,
        name: " Ellicottville Josh",
        description: "Renovated condo with 1 private bedroom (queen), loft (full, twin over full bunk, twin sofa bed) & full bath. Beautiful galley kitchen w/ stainless appliances, hickory cabinets, quartz countertops. Building is next to SnowPine lift @ Holiday Valley. ",
        price: 398,
        previewImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FiaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
      },
      {
        ownerId: 5,
        address: 'Newly Remodeled Home, Five-Minute Walk to Beach',
        city: 'Siesta Key',
        state: 'Florida',
        country: 'United States of America',
        lat: 37.7645564,
        lng: -122.4731430,
        name: "SKLRP And LKV",
        description: `After a day of exploring Siesta Key, cook up some delicious local seafood on the BBQ, sit around the dining table with your guests. In addition, Siesta Key offers kayaking, paddleboard, and boat charters. Let Bahama Mama make your vacation dreams come true!`,
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
