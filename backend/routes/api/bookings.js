const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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
    
})



module.exports = router;
