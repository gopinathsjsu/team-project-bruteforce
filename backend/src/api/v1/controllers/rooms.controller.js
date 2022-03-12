const Joi = require('joi');
const HotelsService = require("../services/hotels.service");

class HotelsController {
    static async createHotel(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email({ minDomainSegments: 2 }),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            });
            await schema.validateAsync(req.body);
            const hotel = await HotelsService.createHotel(req.body)
            res.status(200).send({
                success: true,
                data: {
                    hotel,
                }
            });
        } catch (e) {
            const message = e.message || 'Error occurred while creating the hotel.'
            res.status(400).send({success:false, message})
        }
    }
}

module.exports = HotelsController;
