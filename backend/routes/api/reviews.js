const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// create /add an image for a review - REQUIRE AUTH
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url, previewImage } = req.body;
    const img = await Review.findByPk(reviewId);
    const { user } = req;

    if (!img) {
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    };

    if (img.userId === user.id) {
        //check for the lenght of images
        const images = await Image.findAll({
            where: {
                reviewId: reviewId
            }
        })
        if (images.length < 10) {
            // create image
            const newImg = await Image.create({
                reviewId: req.params.reviewId,
                previewImage,
                url
            });
            // console.log(newImg)

             return res.json(await Image.findByPk(newImg.id, {

                 attributes: [
                     'id',
                     ['reviewId', 'imageableId'],
                     'url'
                 ]
             }));
        } else {
            res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
        }
    } else {
        res.json({
            message: "Review must belong to the current user"
        })
    }
});

// GET REVIEWS OF CURRENT USER -- REQUIRE AUTH
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
                    ['reviewId', 'imageableId'],
                    'url'
                ]
            }
        ]
    });

    res.json({Reviews: currentReview});
});



//EDIT A REVIEW
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const { reviewId } = req.params;
    const { user } = req;
    const reviewItem = await Review.findByPk(reviewId);

    if (!reviewItem) {
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if (reviewItem.userId === user.id) {
        reviewItem.review = review;
        reviewItem.stars = stars;
        await reviewItem.save();

        res.json(reviewItem);
    } else {
        res.json({
            message: "Review must belong to the current user"
        })
    }

});


// DELETE A REVIEW
// need to see the associations for delete cascade
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { user } = req;
    const itemDelete = await Review.findByPk(reviewId);

    if (itemDelete.userId === user.id) {
        if (itemDelete) {
            itemDelete.destroy()
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
            })
        }
    }

})




module.exports = router;
