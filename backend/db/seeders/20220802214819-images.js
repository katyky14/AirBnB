'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
       url: 'https://a0.muscache.com/im/pictures/c84a44cb-8aa6-4f07-937f-6a96edf262f2.jpg?im_w=1200',
       previewImage: true,
       spotId: 1,
       reviewId: 2,
       userId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/3588dca6-4408-4663-9ed9-166b394c5b58.jpg?im_w=1440',
        previewImage: true,
        spotId: 2,
        reviewId: 3,
        userId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/17b49e69-a3b4-4f80-8068-868a3892d6cc?im_w=1200',
        previewImage: true,
        spotId: 3,
        reviewId: 1,
        userId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/e1599128-cdb4-4324-ba8e-d1893475c0bb.jpg?im_w=1200',
        previewImage: true,
        spotId: 4,
        reviewId: 4,
        userId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34446612/original/298e2f93-d382-44d9-a5a7-b69658b234c2.jpeg?im_w=720',
        previewImage: true,
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
