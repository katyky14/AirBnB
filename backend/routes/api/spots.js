const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                [sequelize.literal('Images.url'), 'previewImage']
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                attributes: []
            }
        ],
        group: ['Spot.id']
    });
    return res.json(allSpots)
});

// CREATE A SPOT
router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (req.body) {
        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        });
        res.json(newSpot);
    } else {
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }
});

//create an image for a spot
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const { spotId } = req.params;
    const img = await Spot.findByPk(spotId);

    if (img) {
        const newImg = await Image.create({
            spotId: req.params.spotId,
            url,
        });
        res.json(await Image.findByPk(newImg.id, {
            attributes: [
                'id',
                ['spotId', 'imageableId'],
                'url'
            ]
        }))
    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

})


// GET SPOT OF CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
    //console.log(req.user.id)
    const { user } = req;
    const currentSpot = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                [sequelize.literal('Images.url'), 'previewImage']
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                attributes: []
            }
        ],
        group: ['Spot.id']
    })
    res.status(200);
    res.json(currentSpot)
});

// DETAILS BY ID
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;

    const spotById = await Spot.findByPk(spotId, {
        include: [{
            model: Image,
            attributes: [
                'id',
                ['spotId', 'imageableId'],
                'url'
            ]
        },
        {
            model: User,
            as: 'Owner',
            attributes: [
                'id',
                'firstName',
                'lastName'
            ]
        }]
    });

    res.json(spotById);

    if (!spotId) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

});


module.exports = router;
