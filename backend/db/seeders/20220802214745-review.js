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
        review: 'The location of this place was excellent for our needs. A few minutes to walk to the beach across a beautiful park and 10 to 30 minutes to walk to many shops and restaurants',
        stars: 4,
        userId: 1,
        spotId: 3
      },
      {
        review: 'The floors are disgusting, there are bugs everywhere, no kitchen space, the bathroom is not clean, and there is a flimsy lock on the door. ',
        stars: 1,
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
        review: 'Perfect place for that weekend we had planned.',
        stars: 5,
        userId: 5,
        spotId: 5
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
