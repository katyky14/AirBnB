const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({

    });
    return res.json(allSpots)
})

router.get('/current', requireAuth, async (req, res, next) => {
    //console.log(req.user.id)
    const { user } = req;
    const currentSpot = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt"
        ]
    })
    res.status(200);
    res.json(currentSpot)
})


module.exports = router;
