const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");


//GET ALL SPOTS -- no authentication
router.get('/', async (req, res) => {

    let { page, size } = req.query;
    if (isNaN(page)) { page = 1 };
    if (isNaN(size)) { size = 20 }; //

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}

    if (size >= 1 && page >= 1) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
    } else {
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 0",
                "size": "Size must be greater than or equal to 0",
                "maxLat": "Maximum latitude is invalid",
                "minLat": "Minimum latitude is invalid",
                "minLng": "Maximum longitude is invalid",
                "maxLng": "Minimum longitude is invalid",
                "minPrice": "Maximum price must be greater than or equal to 0",
                "maxPrice": "Minimum price must be greater than or equal to 0"
            }
        })
    }

    const allSpots = await Spot.findAll({
        ...pagination
    })

    //console.log('the spots are ---', allSpots) -- array of objs
    let spotsArr = [];

    for (let spotEle of allSpots) {
        const rating = await Review.findAll({
            where: {
                spotId: spotEle.id
            },
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
            raw: true,
        })

        let previewImageUrl = await Image.findOne({
            where: {
                spotId: spotEle.id
            },
            attributes: [
                'url'
            ]
        })

        if (!previewImageUrl) {
            resultData = {
                ...spotEle.dataValues,
                avgRating: rating[0].avgRating,
                previewImage: null
            }
            spotsArr.push(resultData)
        } else {
            resultData = {
                ...spotEle.dataValues,
                avgRating: rating[0].avgRating,
                previewImage: previewImageUrl.url
            }
            spotsArr.push(resultData)
        }
    }

    res.json({ Spots: spotsArr, page: page, size: size });
});


// CREATE A SPOT
router.post('/', requireAuth, async (req, res) => {
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
    const { url, previewImage } = req.body;
    const { spotId } = req.params;
    const img = await Spot.findByPk(spotId);

    if (img) {
        const newImg = await Image.create({
            spotId: req.params.spotId,
            url,
            previewImage
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


// GET SPOT OF CURRENT USER -- need AUTH
router.get('/current', requireAuth, async (req, res, next) => {

    const currentSpot = await Spot.findAll();

    //console.log(currentSpot)
    let spotArr = [];

    for (let spotEle of currentSpot) {
        const ratings = await Review.findAll({
            where: {
                spotId: spotEle.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ],
            raw: true,
        })

        let previewImageUrl = await Image.findOne({
            where: {
                spotId: spotEle.id
            },
            attributes: ['url']
        });

        //console.log('preview image url is ---', previewImageUrl.url) -- this key into the url and gets the url

        if (!previewImageUrl) {
            resultData = {
                ...spotEle.dataValues,
                avgRating: ratings[0].avgRating,
                previewImage: null
            }
            spotArr.push(resultData)
        } else {
            resultData = {
                ...spotEle.dataValues,
                avgRating: ratings[0].avgRating,
                previewImage: previewImageUrl.url
            }
            spotArr.push(resultData)
        }
    }

    res.json({ Spots: resultData });
});

// GET SPOT DETAILS BY ID -- NO auth
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

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ]
    })
    let reviewCount = await Review.count({
        where: { spotId: spot.id }
    })

    //console.log('the spots----', spots)
    //console.log('the ----', reviews)
    //console.log('the review count ---', reviewCount)
    let val = reviews[0].dataValues.avgRating
    //console.log('the val ---', val.dataValues.avgRating)
    spots.dataValues.avgRating = val;
    spots.dataValues.numReviews = reviewCount;

    res.json(spots);
});


//EDIT SPOT -- REQUIRE AUTH
router.put('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const item = await Spot.findByPk(spotId);

    if (!item) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if (item.ownerId === user.id) {
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
    } else {
        res.json({
            message: "Spot must belong to the current user"
        })
    }


})

// create a REVIEW for Spot based on the spot's id - REQUIRE AUTH
router.post('/:spotId/reviews', requireAuth, async (req, res) => {

    const { spotId } = req.params;
    const spotItem = await Spot.findByPk(spotId);
    if (!spotItem) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const reviewSpot = await Review.findAll({
        where: {
            spotId: spotId,
            userId: req.user.id
        }
    });
    // console.log('the review ----', reviewSpot)

    if (reviewSpot.length) {
        res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    } else {
        const { review, stars } = req.body;
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: spotId,
            review: review,
            stars: stars,
        });
        res.json(newReview);
    }
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
                        ['spotId', 'imageableId'],
                        'url'
                    ]
                }
            ]
        });

        res.json({ Reviews: spotsReviews });
    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

});

// DELETE SPOT -- REQUIRE AUTH

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;
    const deletedItem = await Spot.findByPk(spotId);

    if (!deletedItem) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })

    }

    if (deletedItem.ownerId !== user.id) {
        res.json({
            message: "Spot must belong to the current user"
        })
    }
    //console.log(deletedItem.ownerId)
    if (deletedItem.ownerId === user.id ) {
            await deletedItem.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
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

    if (bookingSpot.ownerId !== user.id) {
        const newBooking = await Booking.create({
            spotId: spotId,
            userId: user.id,
            startDate: startDate,
            endDate: endDate
        })

        return res.json(newBooking)
    } else {
        res.json({
            message: "Spot must NOT belong to the current user"
        })
    }
});


// GET ALL BOOKINGS FOR A SPOT BY ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;
    const spotBooked = await Spot.findByPk(spotId);

    //console.log('the owner id ---',spotBooked.ownerId === user.id);
    if (!spotBooked) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    if (spotBooked.ownerId !== user.id) {
        // response if NOT owner
        const userBooking = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        });
        //console.log('user booking -----', userBooking)
        return res.json({Bookings: userBooking})

    }

    //console.log('the user id ---', user.id)
    // response if IT IS owner
    if (spotBooked.ownerId === user.id) {
        const ownerBookings = await Booking.findAll({
            where: {
                spotId: spotId,
            },
            attributes: ['id', 'spotId', 'userId', 'startDate', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName'
                    ]
                },
            ]
        });
        //console.log('the owner-----', ownerBookings)
        return res.json({Bookings: ownerBookings})
    }

});




module.exports = router;
