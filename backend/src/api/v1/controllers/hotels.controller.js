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
    static async searchHotels (req, res) {
        try {
            const body = req.body;
            const schema = Joi.object({
                term: Joi.string().required(),
            });
            await schema.validateAsync(body);
            const reports = await HotelsService.searchHotels(req.body);
            res.status(200).send(reports);
        } catch (e) {
            const message = e.message || 'Error occurred while searching hotels.'
            res.status(400).send({message})
        }
    }
}

module.exports = HotelsController;
