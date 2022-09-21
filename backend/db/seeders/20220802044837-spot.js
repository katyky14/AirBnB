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
        name: "Luffy D. Monkey",
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
        name: "Roronoa Zoro",
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
        name: "Condé Nast Robin",
        description: `We invite you to experience the otherworldly at Sol to Soul, a ten-acre sanctuary in a mystical theater of boulders. Stay up late with the Milky Way. Howl at the moon from atop a boulder. `,
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
        name: " Ellicottville Chopper",
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
        name: "Portgas D Ace",
        description: `After a day of exploring Siesta Key, cook up some delicious local seafood on the BBQ, sit around the dining table with your guests. In addition, Siesta Key offers kayaking, paddleboard, and boat charters. Lets make your vacation dreams come true!`,
        price: 498,
        previewImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      },
      {
        ownerId: 1,
        address: 'Ocean Mist-Walk ',
        city: 'Seaside',
        state: 'Oregon',
        country: 'United States of America',
        lat: 37.7645564,
        lng: -122.4731430,
        name: "Luffy D Monkey",
        description: `Ocean Mist is located 450 feet from the Seaside Prom, and close to downtown Seaside, this newly fully remodeled home is the perfect place to enjoy your next visit to the Oregon Coast.`,
        price: 599,
        previewImage: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      },
      {
        ownerId: 2,
        address: 'Cubby Bear- Hot Tub, Rock Wall, Near Lake & Skiing',
        city: 'Lake Tahoe',
        state: 'CA',
        country: 'United States',
        lat: 37.7645359,
        lng: -122.4730328,
        name: "Roronoa Zoro",
        description: `Less than 4 mi from the lake, Heavenly, and Tahoe’s best restaurants and shops. Gather up some fresh ingredients at the nearby grocery store because this kitchen will inspire you! `,
        price: 598,
        previewImage: "https://images.unsplash.com/photo-1634253539593-04009bf64a55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      },
      {
        ownerId: 3,
        address: 'Sol to Soul in the Space',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States',
        lat: 37.7645360,
        lng: -122.4730329,
        name: "Mil Fleurs Robin",
        description: `Welcome to your private space sanctuary of peace, galaxy and earth. Enjoy the view of everything from above`,
        price: 1000,
        previewImage: "https://cdn.cnn.com/cnnnext/dam/assets/220727110543-06-space-perspective-full-169.jpg"
      },
      {
        ownerId: 4,
        address: 'The Round House',
        city: 'Delta',
        state: 'Colorado',
        country: 'United States',
        lat: 47.7645560,
        lng: -128.4731429,
        name: " Tony Tony Chopper",
        description: "Welcome to the Round House! This one-of-a-kind, converted grain silo has everything you need to feel right at home.",
        price: 388,
        previewImage: "https://images.unsplash.com/photo-1516622236816-1dca819b5db8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
      },
      {
        ownerId: 5,
        address: 'Downtown River Cottage!',
        city: 'Talkeetna',
        state: 'Alaska',
        country: 'United States of America',
        lat: 67.7645564,
        lng: -128.4731430,
        name: "Portgas D Ace",
        description: `Spend the night in an enchanted cottage for two where time stands still and the world’s cares fade.`,
        price: 798,
        previewImage: "https://cdn.pixabay.com/photo/2017/06/07/20/42/home-2381578_960_720.jpg"
      },
      {
        ownerId: 1,
        address: 'Phoenix East Wing',
        city: 'El Prado',
        state: 'New Mexico',
        country: 'United States of America',
        lat: 47.7645564,
        lng: -125.4731430,
        name: "Luffy D Monkey",
        description: `The Phoenix official Earthship cannot be compared to any other rental in this world. This home’s jungle greenhouse creates its own microclimate.`,
        price: 668,
        previewImage: "https://images.unsplash.com/photo-1554138508-4295f6d49b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
      },
      {
        ownerId: 2,
        address: 'Yurt Overlook',
        city: 'Oderville',
        state: 'Utah',
        country: 'United States',
        lat: 37.7645359,
        lng: -122.4730328,
        name: "Roronoa Zoro",
        description: `Welcome to "The Cliff Dwelling Yurts" at East Zion Resort! We believe that the places you stay while on vacation should be a unique and fascinating experience!`,
        price: 275,
        previewImage: "https://images.unsplash.com/photo-1536395155544-a3ba483e0b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      },
      {
        ownerId: 3,
        address: 'Villa Arrecife Beach House',
        city: 'El Limon',
        state: 'Samana',
        country: 'Dominican Republic',
        lat: 37.7645360,
        lng: -177.4730329,
        name: "Mil Fleurs Robin",
        description: `Feel like exploring the Dominican? Start the day with a hike on one of Playa Moron’s many trails. `,
        price: 3000,
        previewImage: "https://images.unsplash.com/photo-1528913775512-624d24b27b96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
      {
        ownerId: 4,
        address: 'Treehouse-Eagles Perch over the water',
        city: 'Port Angeles',
        state: 'Washington',
        country: 'United States',
        lat: 47.7645560,
        lng: -128.4731429,
        name: " Tony Tony Chopper",
        description: "Stunning Tree house looking over the Strait of Juan De Fuca is a total North-West Washington experience. I",
        price: 438,
        previewImage: "https://images.unsplash.com/photo-1626290131022-4e5a5e167173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
      },
      {
        ownerId: 5,
        address: 'Highlands Castle Lake George',
        city: 'Bolton',
        state: 'New York',
        country: 'United States of America',
        lat: 57.7645564,
        lng: -128.4731430,
        name: "Portgas D Ace",
        description: `You'll be captivated by the tranquility of Highlands Castle overlooking Lake George!`,
        price: 8295,
        previewImage: "https://images.unsplash.com/photo-1571918372905-b98f68fe214a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80"
      },
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
