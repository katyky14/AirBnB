'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
       url: 'https://a0.muscache.com/im/pictures/f98f23e0-ff5b-4cfa-9f64-7fc9dc966041.jpg?im_w=720',
       previewImage: false,
       spotId: 1,
       reviewId: 2,
       userId: 1
      },
      {
        url: '	https://a0.muscache.com/im/pictures/1a2378e8-88b8-4fc7-b69e-0d1ddf61fe27.jpg?im_w=720',
        previewImage: true,
        spotId: 2,
        reviewId: 3,
        userId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/619ab404-7a6c-4425-a79c-9459b1c00b1b.jpg?im_w=1200',
        previewImage: false,
        spotId: 3,
        reviewId: 1,
        userId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/56b2dc82-ed11-46a4-bf86-eb0bba5c2366.jpg?im_w=1200',
        previewImage: false,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3…67d0e1-8c3b-4588-97de-3e1a4793f86b.jpeg?im_w=1200',
        previewImage: false,
        spotId: 5,
        reviewId: 5,
        userId: 5
      }
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
