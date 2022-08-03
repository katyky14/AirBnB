const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// create an image for a review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url, previewImage } = req.body;
    const img = await Review.findByPk(reviewId);

    if (!img) {
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    };

    //aggregate


    //image
    const newImg = await Image.create({
        reviewId: req.params.reviewId,
        previewImage,
        url
    });

    console.log(newImg)

    return res.json(await Image.findByPk(newImg.id, {

        attributes: [
            'id',
            ['reviewId', 'imageableId'],
            'url'
        ]
    }));

});

// GET REVIEWS OF CURRENT USER

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const currentReview = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: [
                    'id',
                    'firstName',
                    'lastName'
                ]
            },
            {
                model: Spot,
                attributes: [
                    'id',
                    'ownerId',
                    'address',
                    'city',
                    'state',
                    'country',
                    'lat',
                    'lng',
                    'name',
                    'price'
                ]
            },
            {
                model: Image,
                attributes: [
                    'id',
                    ['userId', 'imageableId'],
                    'url'
                ]
            }
        ]
    });

    res.json(currentReview);
});



//EDIT A REVIEW
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const { reviewId } = req.params;

    const reviewItem = await Review.findByPk(reviewId);

    if (!reviewItem) {
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    reviewItem.review = review;
    reviewItem.stars = stars;
    await reviewItem.save();

    res.json(reviewItem);

})




module.exports = router;
