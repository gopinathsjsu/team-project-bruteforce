const { Hotel, PeakPrices, Booking} = require("../models");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const moment = require('moment');
const RoomsService = require("./rooms.service");
const UsersService = require("./users.service");


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
    static async addPeakPrice(hotelParams) {
        let { name, percent, date, dayPattern, hotelId } = hotelParams;
        const id =  uuidv4();
        const hotel = await this.getHotelById(hotelId);
        const peakPrice = await PeakPrices.create({
            id,
            name,
            percent,
            date,
            dayPattern,
        });
        await hotel.addPeakPrice(peakPrice);

        return PeakPrices.findOne({
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
        let { hotelId, rooms, startDate, endDate, userId } = bookingParams;
        // Check the email is not in use already
        const id =  uuidv4();
        const hotel = await this.getHotelById(hotelId);
        const user = await UsersService.getUserById(userId);
        let peakPrice;
        peakPrice = await PeakPrices.findOne({
            where: {
                date: moment(startDate, 'MM-DD-YYYY').getDate(),
            }
        });
        if (!peakPrice) {
            const day = moment(startDate, 'MM-DD-YYYY').getDay();
            // Look for it in peakPrice table
            peakPrice = await PeakPrices.findOne({
                where: {
                    dayPattern: day,
                }
            });
        }

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
        // Find out loyalty points
        let loyaltyPoints = 0;
        const prevBooking = await Booking.findAll({
            where: {
                HotelId: hotelId,
                UserId: userId,
                cancelled: false,
            }
        })
        console.log({prevBooking});
        for (let i in prevBooking) {
            loyaltyPoints += prevBooking[1].totalPrice;
        }

        if (peakPrice) {
            totalPrice = totalPrice + ((totalPrice*peakPrice.percent) /100);
        }
        if (loyaltyPoints) {
            totalPrice -= (loyaltyPoints / 100)
        }
        const booking = await Booking.create({
            roomsData: rooms,
            totalPrice,
            PeakPriceId: peakPrice ? peakPrice.id : null,
            startDate,
            endDate,
        });
        await hotel.addBooking(booking);
        await user.addBooking(booking);
        await peakPrice.addBooking(booking);
        return booking;
    }
    static async updateBooking(bookingParams) {
        let { bookingId, rooms, startDate, endDate, } = bookingParams;
        const booking = await Booking.findOne({
            where: {
                id: bookingId
            },
            include: []
        });
        if (!booking) {
            throw Error('Invalid booking id passed!');
        }
        let peakPrice;
        peakPrice = await PeakPrices.findOne({
            where: {
                date: moment(startDate, 'MM-DD-YYYY').getDate(),
            }
        });
        if (!peakPrice) {
            const day = moment(startDate, 'MM-DD-YYYY').getDay();
            // Look for it in peakPrice table
            peakPrice = await PeakPrices.findOne({
                where: {
                    dayPattern: day,
                }
            });
        }

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
        booking.totalPrice = totalPrice;
        booking.roomsData = rooms;
        booking.startDate = startDate;
        booking.endDate = endDate;
        if (peakPrice) {
            booking.totalPrice = totalPrice + ((totalPrice*peakPrice.percent) /100)
            booking.PeakPriceId = peakPrice.id;
        }
        await booking.save();
        return booking;
    }

    static async cancelBooking(bookingParams) {
        let { bookingId } = bookingParams;
        const booking = await Booking.findOne({
            where: {
                id: bookingId
            },
            include: []
        });
        if (!booking) {
            throw Error('Invalid booking id passed!');
        }
        booking.cancelled = true;
        await booking.save();
        return {
            message: 'Booking cancelled successfully',
        }

    }
}

module.exports = HotelsService;
