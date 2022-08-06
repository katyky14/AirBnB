const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check, sanitizeQuery } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



//DELETE AN IMAGE
//check for association
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const { user } = req;
    const deletedItem = await Image.findByPk(imageId);

    console.log('-----', deletedItem)
    if (!deletedItem) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (deletedItem.dataValues.userId === user.id) {
        await deletedItem.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })

    } else {
        res.json({
            message: "Image must belong to the current user"
        })
    }

})

module.exports = router;
