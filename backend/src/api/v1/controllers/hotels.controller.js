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
    static async addPeakPrice(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                percent: Joi.string().required(),
                hotelId: Joi.string().required(),
                userId: Joi.string().required(),
                date: Joi.string().required(),
                dayPattern: Joi.string().required(),
            });
            await schema.validateAsync(req.body);
            const hotel = await HotelsService.addPeakPrice(req.body)
            res.status(200).send({
                success: true,
                data: {
                    hotel,
                }
            });
        } catch (e) {
            const message = e.message || 'Error occurred while adding peak price.'
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
    static async addBooking(req, res) {
        try {
            const schema = Joi.object({
                hotelId: Joi.string().required(),
                userId: Joi.string().required(),
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
                rooms: Joi.object().required(), // roomId, amenityIds, guestCount
                peakPriceId: Joi.string().required(),
            });
            await schema.validateAsync(req.body);
            const room = await HotelsService.addBooking(req.body)
            res.status(200).send({
                success: true,
                data: {
                    room,
                }
            });
        } catch (e) {
            const message = e.message || 'Error occurred while creating the booking.'
            res.status(400).send({success:false, message})
        }
    }

    static async updateBooking(req, res) {
        try {
            const schema = Joi.object({
                bookingId: Joi.string().required(),
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
                rooms: Joi.object().required(), // roomId, amenityIds, guestCount
            });
            await schema.validateAsync(req.body);
            const response = await HotelsService.updateBooking(req.body)
            res.status(200).send({
                success: true,
                data: response,
            });
        } catch (e) {
            const message = e.message || 'Error occurred while updating the booking.'
            res.status(400).send({success:false, message})
        }
    }
    static async cancelBooking(req, res) {
        try {
            const schema = Joi.object({
                bookingId: Joi.string().required(),
            });
            await schema.validateAsync(req.body);
            const response = await HotelsService.cancelBooking(req.body)
            res.status(200).send({
                success: true,
                data: response
            });
        } catch (e) {
            const message = e.message || 'Error occurred while cancelling the booking.'
            res.status(400).send({success:false, message})
        }
    }
}

module.exports = HotelsController;
