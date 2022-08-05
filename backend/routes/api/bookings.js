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
                        attributes: [ ['url', 'previewImage']],

                    }
                ]
            }
        ],

    })

    res.json(currentBooking);
});



//EDIT A BOOKING
router.put('/:bookingId', requireAuth ,async (req, res) => {
    const { bookingId } = req.params;

    const { startDate, endDate } = req.body;

    const booked = await Booking.findByPk(bookingId);

    if(!booked) {
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }


      // before or on startDate
      let todayDate = new Date().toISOString().slice(0, 10)

      if (endDate < todayDate || endDate < startDate || startDate < todayDate) {
              res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
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


    booked.startDate =  startDate;
    booked.endDate = endDate;
    await booked.save();

    res.json(booked)
})

// DELETE A BOOKING
// check for associations
router.delete('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    const deletedItem = await Spot.findByPk(bookingId);


    if (deletedItem) {
        await deletedItem.destroy();
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

module.exports = router;
