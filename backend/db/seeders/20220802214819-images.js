'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
       url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
       previewImage: true,
       spotId: 1,
       reviewId: 2,
       userId: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        previewImage: true,
        spotId: 2,
        reviewId: 3,
        userId: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80',
        previewImage: true,
        spotId: 3,
        reviewId: 1,
        userId: 3
      },
      {
        url: 'https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        previewImage: true,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        previewImage: true,
        spotId: 5,
        reviewId: 5,
        userId: 5
      },
      {
        url: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        previewImage: true,
        spotId: 6,
        reviewId: 6,
        userId: 2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Images', null, {});
  }
};
