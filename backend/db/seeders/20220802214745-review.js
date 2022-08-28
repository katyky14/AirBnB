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
        review: 'The location of this place was excellent for our needs. A few minutes to walk to the beach across a beautiful park ',
        stars: 4,
        userId: 1,
        spotId: 3
      },
      {
        review: 'Beautiful well-kept home and fabulous pool! Walking distance to the beach, tons of shops, restaurants and grocery store. Highly recommend!',
        stars: 5,
        userId: 3,
        spotId: 4
      },
      {
        review: 'Great Location. Older style home unit, do not expect brand new. AC bedrooms, strong wifi, hot showers, full kitchen. Nice spot if you are a tourist.',
        stars: 3,
        userId: 4,
        spotId: 2
      },
      {
        review: 'Perfect place for that weekend we had planned.This home is beautiful! We loved everything from the location to the decor. Would highly recommend!!',
        stars: 5,
        userId: 5,
        spotId: 5
      },
      {
        review: 'Really nice house in perfect location - close to beach and town. Thanks so much!',
        stars: 5,
        userId: 5,
        spotId: 6
      }
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
