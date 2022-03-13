const Joi = require('joi');
const RoomsService = require("../services/rooms.service");

class RoomsController {
    static async addRoom(req, res) {
        try {
            const schema = Joi.object({
                hotelId: Joi.string().required(),
                userId: Joi.string().required(),
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
                type: Joi.string().allow('SINGLE_ROOM', 'DOUBLE_ROOM', 'SUITE'),
                guestPricePerDay: Joi.number(),
                peakPriceId: Joi.string().required(),
            });
            await schema.validateAsync(req.body);
            const room = await RoomsService.createRoom(req.body)
            res.status(200).send({
                success: true,
                data: {
                    room,
                }
            });
        } catch (e) {
            const message = e.message || 'Error occurred while creating the room.'
            res.status(400).send({success:false, message})
        }
    }
}

module.exports = RoomsController;
