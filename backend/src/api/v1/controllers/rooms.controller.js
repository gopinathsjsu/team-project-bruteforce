const Joi = require('joi');
const RoomsService = require("../services/rooms.service");

class RoomsController {
    static async addRoom(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                hotelId: Joi.string().required(),
                type: Joi.string().allow('SINGLE_ROOM', 'DOUBLE_ROOM', 'SUITE'),
                pricePerDay: Joi.number(),
                guestPricePerDay: Joi.number(),
                freeGuestCount: Joi.number(),
                roomsCount: Joi.number(),
            });
            await schema.validateAsync(req.body);
            const room = await RoomsService.addRooms(req.body)
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
