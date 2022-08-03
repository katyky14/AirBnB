const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// create an image for a review

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;
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
        url
    });

    return res.json(await Image.findByPk(newImg.id, {
        attributes: [
            'id',
            ['reviewId', 'imageableId'],
            'url'
        ]
    }));




})




module.exports = router;
