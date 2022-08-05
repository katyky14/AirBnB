const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");


//GET ALL CURRENT USER'S BOOKING
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const currentBooking = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: [
                    'id', 'ownerId', 'address', 'city', 'state', 'country',
                    'lat', 'lng', 'name', 'price'
                ],
                include: [
                    {
                        model: Image,
                        //attributes: []
                        attributes: [['url', 'previewImage']],

                    }
                ]
            }
        ],

    })

    // const images = await Image.findAll({
    //     attributes: ['url']
    // })

    //console.log('the ima ---', images)
    //currentBooking.dataValues.previewImage = images[0].dataValues.url
    res.json({Bookings: currentBooking});
});



//EDIT A BOOKING
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const { user } = req;
    const booked = await Booking.findByPk(bookingId);

    if (!booked) {
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    // before or on startDate
    let todayDate = new Date().toISOString().slice(0, 10) // '2022-05-19'
    //let todayDate = new Date();
    if (endDate < todayDate || endDate < startDate || startDate < todayDate) {
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    };

    //conflicted dates
    let spotId = booked.spotId;
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

    booked.startDate = startDate;
    booked.endDate = endDate;
    await booked.save();

    res.json(booked)
})

// DELETE A BOOKING
// check for associations
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    //const { startDate } = req.body;
    const deletedItem = await Booking.findByPk(bookingId);
    const { user } = req;
    //console.log('the deleted ---',deletedItem.dataValues.startDate)

    if (!deletedItem) {
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    let today = new Date();
    let changeToday = today.toISOString().slice(0, 10);
    let past = deletedItem.startDate;
    //let changePast = past.toISOString().slice(0, 10); // booking have a started date

    console.log('the past ---', past)
    if (past < changeToday) {
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }

    if (deletedItem.userId === user.id) {
        if (deletedItem) {
            await deletedItem.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        }
    } else {
        res.status(403)
        res.json({
            "message": "Booking must belong to the current user or the Spot must belong to the current user"
        })
    }

})

module.exports = router;
