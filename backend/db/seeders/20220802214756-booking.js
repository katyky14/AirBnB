'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        userId: 2,
        spotId: 1,
        startDate: '2022-07-01',
        endDate: '2022-07-15'
      },
      {
        userId: 1,
        spotId: 3,
        startDate: '2022-09-21',
        endDate: '2022-09-30',
      },
      {
        startDate: '2022-10-11',
        endDate: '2022-10-16',
        userId: 3,
        spotId: 5,
      },
      {
        startDate: '2022-10-18',
        endDate: '2022-10-26',
        userId: 4,
        spotId: 2
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
