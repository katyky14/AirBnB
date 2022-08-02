const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({

    });
    return res.json(allSpots)
})


module.exports = router;
