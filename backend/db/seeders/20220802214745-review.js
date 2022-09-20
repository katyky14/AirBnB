'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Reviews', [
      {
        review: 'The location of this place is great! It is within walking distance of Wakiki beach and anything else surrounding that area.',
        stars: 5,
        userId: 2,
        spotId: 1
      },
      {
        review: 'The property is spacious and comfortable in a good location and the hot tub is a nice bonus. ',
        stars: 4,
        userId: 3,
        spotId: 1
      },
      {
        review: 'Beautiful setting and the location was exactly what we wanted. So many amenities-great for a family vacation.',
        stars: 5,
        userId: 1,
        spotId: 2
      },
      {
        review: 'Beautiful well-kept home and fabulous pool! Walking distance to the beach, tons of shops, restaurants and grocery store. Highly recommend!',
        stars: 5,
        userId: 4,
        spotId: 2
      },
      {
        review: 'Great Location. Older style home unit, do not expect brand new. AC bedrooms, strong wifi, hot showers, full kitchen. Nice spot if you are a tourist.',
        stars: 3,
        userId: 5,
        spotId: 3
      },
      {
        review: 'Perfect place for that weekend we had planned.This home is beautiful! We loved everything from the location to the decor. Would highly recommend!!',
        stars: 5,
        userId: 2,
        spotId: 3
      },
      {
        review: 'Really nice house in perfect location - close to beach and town. Thanks so much!',
        stars: 4,
        userId: 1,
        spotId: 4
      },
      {
        review: 'We had a great time. It is a beautiful place. Well kept and clean.',
        stars: 5,
        userId: 3,
        spotId: 4
      },
      {
        review: 'Amazing place in a fabulous location. The atmosphere inside the house is very cozy and home-like. ',
        stars: 5,
        userId: 3,
        spotId: 5
      },
      {
        review: 'Very nice housing and location. We enjoyed the whirlpool.',
        stars: 3,
        userId: 5,
        spotId: 6
      },
      {
        review: 'The location is nice and safe and while in a neighborhood it feels private.',
        stars: 4,
        userId: 4,
        spotId: 7
      },
      {
        review: 'Great cabin and lots of amenities. It was hard to get to the cabin since it is in a gated community got lost multiple times the first day.',
        stars: 5,
        userId: 5,
        spotId: 8
      },
      {
        review: 'The only negative feedback I have is on the cleanliness, the house looks neat and tidy over all however, there are dust bunnies.',
        stars: 3,
        userId: 2,
        spotId: 9
      },
      {
        review: 'Such a cool spot — loved the hot tub and all beds were comfy ',
        stars: 5,
        userId: 2,
        spotId: 10
      },
      {
        review: `Unique and stunning space! Really surreal being there. It's the perfect blend of nature and modern living.`,
        stars: 5,
        userId: 2,
        spotId: 11
      },
      {
        review: `We loved East Zion Resort! Yurt 2 was private and had a firepit and a killer view of the sunset.`,
        stars: 4,
        userId: 3,
        spotId: 12
      },
      {
        review: `Our stay was incredible. The house is nothing short of amazing with ocean views.`,
        stars: 5,
        userId: 1,
        spotId: 13
      },
      {
        review: `We had a wonderful stay and would definitely come back again!`,
        stars: 5,
        userId: 5,
        spotId: 14
      },
      {
        review: `The castle and view is beyond any words. The memory of being in the castle will be our forever precious.`,
        stars: 5,
        userId: 4,
        spotId: 15
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};
