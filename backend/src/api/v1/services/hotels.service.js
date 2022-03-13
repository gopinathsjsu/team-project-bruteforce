const { Hotel, PeakPrices, Booking} = require("../models");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const moment = require('moment');
const RoomsService = require("./rooms.service");


class HotelsService {
    static async getHotelByEmail(email) {
        if (!email) {
            throw Error('No email specified');
        } else {
            return Hotel.findOne({
                where: {
                    email,
                }
            });
        }
    }
    static async getHotelById(id) {
        if (!id) {
            throw Error('No id specified');
        } else {
            return Hotel.findOne({
                where: {
                    id,
                }
            });
        }
    }
    static async createHotel(hotelParams) {
        let { email, name, password } = hotelParams;
        // Check the email is not in use already
        const isEmailUsed = await this.getHotelByEmail(email);
        if (isEmailUsed) {
            throw Error('email already in use');
        }

        let passwordHash = null;

        if(password) {
            passwordHash = await bcrypt.hash(password, 10);
        }
        const id =  uuidv4();
        const createdHotel = await Hotel.create({
            id,
            name,
            email,
            password: passwordHash,
        });
        return Hotel.findOne({
            where: {
                id,
            },
        });
    }

    static async searchHotels({term}) {
        return await Hotel.findAll({
            where: {
                [Op.or]: [
                    {name: {[Op.iLike]: `%${term}%`}},
                    {email: {[Op.iLike]: `%${term}%`}},
                ]
            }
        });
    }

    static async addBooking(bookingParams) {
        let { hotelId, rooms, startDate, endDate, userId, peakPriceId } = bookingParams;
        // Check the email is not in use already
        const id =  uuidv4();
        const hotel = await this.getHotelById(hotelId);
        // calculate the pricing for the rooms and extra guest in each room for the total days
        // TODO Find if the startDate of the booking is under peakPrice
        let totalPrice = 0;
        let days = 1;
        if (endDate !== startDate) {
            days = 1 + moment(endDate, 'MM-DD-YYYY').diff(moment(startDate, 'MM-DD-YYYY'), 'days');
        }

        for (const roomIdx in rooms) {
            const room = await RoomsService.getRoomById(rooms[roomIdx].roomId);
            if (!room) {
                throw Error('Booking error, Rooms not found.');
            } else {
                const extraGuest = rooms[roomIdx].guestCount > room.freeGuestCount ? rooms[roomIdx].guestCount - room.freeGuestCount : 0
                // find out the amenities booked and their prices
                let amenPrice = 0;
                room.Amenities.map(a => {
                    if (rooms[roomIdx].amenityIds.includes(a.id)) {
                        amenPrice += a.price;
                    }
                });
                totalPrice += (room.pricePerDay +  (room.guestPricePerDay * extraGuest) +  amenPrice);
            }
        }
        // update the price with by multiplying the days
        totalPrice *= days;
        return Booking.create({
            HotelId: hotelId,
            UserId: userId,
            // TODO create model for booked rooms - num of guest, amenities selected,
            totalPrice,
            PeakPriceId: peakPriceId,
            startDate,
            endDate,
        });
    }
}

module.exports = HotelsService;
