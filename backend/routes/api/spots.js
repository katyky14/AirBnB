const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");


//GET ALL SPOTS
router.get('/', async (req, res, next) => {

    //const { spot } = req;

    //console.log('the image is', Spot.spotId)
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                //[sequelize.literal('Images.url'), 'previewImage']
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                attributes: [

                    ['url', 'previewImage']
                ]
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
        return res.json(await Image.findByPk(newImg.id, {
            attributes: [
                'id',
                ['spotId', 'imageableId'],
                'url'
            ]
        }))
    } else {
        return res.json({
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
                attributes: [
                    // ['url', 'previewImage']
                ]
            }
        ],
        group: ['Spot.id', 'Image.id']
    })
    res.status(200);
    res.json(currentSpot)
});

// GET SPOT DETAILS BY ID
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };


    const spots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
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
    res.json(spots);


});

//EDIT SPOT
router.put('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const item = await Spot.findByPk(spotId);

    if (!item) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    item.address = address
    item.city = city;
    item.state = state;
    item.country = country;
    item.lat = lat;
    item.lng = lng;
    item.name = name;
    item.description = description;
    item.price = price;
    await item.save();

    res.json(item);

})

// create a review for Spot based on the spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {

    const { spotId } = req.params;
    const spotItem = await Spot.findByPk(spotId);
    if (!spotItem) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const spot = await Spot.findOne({
        where: { id: req.params.spotId }
    });
    const { review, stars } = req.body;
    const newReview = await Review.create({
        userId: spot.ownerId,
        spotId: spot.id,
        review: review,
        stars: stars,
    });
    res.json(newReview);

    //console.log('the review is: ----',newReview)
    //check for duplicate reviews of same user

});

// GET ALL REVIEWS BY SPOT ID

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const spotIdCheck = await Spot.findByPk(spotId);


    if (spotIdCheck) {
        const spotsReviews = await Review.findAll({
            where: {
                spotId: spotId
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
                    model: Image,
                    attributes: [
                        'id',
                        ['reviewId', 'imageableId'],
                        'url'
                    ]
                }
            ]
        });

        res.json(spotsReviews);
    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

});

// DELETE SPOT

router.delete('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    const deletedItem = await Spot.findByPk(spotId);

    await deletedItem.destroy();

    if (deletedItem) {
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})


//CREATE BOOKING BASED ON SPOT ID

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const bookingSpot = await Spot.findByPk(spotId);
    const { user } = req;

    if (!bookingSpot) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    // before or on startDate
    let todayDate = new Date().toISOString().slice(0, 10)

    if (endDate < todayDate || endDate < startDate || startDate < todayDate) {
        res.statusCode = 400,
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
    };

    // conflicted dates
    const dates = await Booking.findAll({
        where: {
            [Op.and]: [
                { startDate: startDate },
                { spotId: spotId }
            ]
        }
    });

    // const dates = await Booking.findAll({
    //     where: {
    //         startDate: startDate
    //     },
    //     include: {
    //         model: Spot
    //     }

    // })


    if (dates.length >= 1) {
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }


    const newBooking = await Booking.create({
        spotId: spotId,
        userId: user.id,
        startDate: startDate,
        endDate: endDate
    })

    return res.json(newBooking)
});


// GET ALL BOOKINGS FOR A SPOT BY ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;
    const spotBooked = await Spot.findByPk(spotId);

    if (!spotBooked) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    //console.log('the owner id ---',spotBooked.ownerId);
    //console.log('the user id ---', user.id)
    // response if IT IS owner
    if (spotBooked.ownerId === user.id) {
        const ownerBookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName'
                    ]
                }
            ]
        });
        return res.json(ownerBookings)
    } else {
        // response if NOT owner
        const userBooking = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        });
        return res.json(userBooking)
    }
});




module.exports = router;
