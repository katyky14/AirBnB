const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
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

    //console.log('-----', deletedItem)
    if (!deletedItem) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    // console.log('-----', deletedItem.dataValues.userId === user.id)
    // if (deletedItem.dataValues.userId === user.id) {
    //     if (deletedItem) {

    //         await deletedItem.destroy();
    //         res.json({
    //             "message": "Successfully deleted",
    //             "statusCode": 200
    //         })
    //     } else {
    //         res.json({
    //             message: "Spot cannot be found"
    //         })
    //     }
    // } else {
    //     res.json({
    //         message: "Image must belong to the current user"
    //     })
    // }

    if (deletedItem) {
        await deletedItem.destroy();
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        res.json({
            message: "Image must belong to the current user"
        })
    }

})

// router.delete('/:imageId', restoreUser, requireAuth, async (req, res, next) => {
//     const {imageId} = req.params
//     const {user} = req

//     const deleteImage = await Image.findByPk(imageId)

//     if(!deleteImage){
//         res.statusCode = 404,
//         res.json({
//             "message": "Image couldn't be found",
//             "statusCode": 404
//           })
//     }

//     if(deleteImage.userId === user.id){
//         await deleteImage.destroy()
//         res.json({
//             "message": "Successfully deleted",
//             "statusCode": 200
//         })
//     } else {
//         res.statusCode = 403
//         res.json({
//             "message": "Image must belong to the current user",
//             "statusCode": 403
//         })
//     }

// })



module.exports = router;
