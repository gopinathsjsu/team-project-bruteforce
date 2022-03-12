const { Room} = require("../models");
const { v4: uuidv4 } = require('uuid');

class RoomsService {
    static async getRoomByEmail(email) {
        if (!email) {
            throw Error('No email specified');
        } else {
            return Room.findOne({
                where: {
                    email,
                }
            });
        }
    }

    static async createRoom(roomParams) {
        let { email, name, type, pricePerDay, guestPricePerDay, freeGuestCount } = roomParams;
        // Check the email is not in use already
        const isEmailUsed = await this.getRoomByEmail(email);
        if (isEmailUsed) {
            throw Error('email already in use');
        }
        const id =  uuidv4();
        const createdRoom = await Room.create({
            id,
            name,
            email,
            type,
            pricePerDay,
            guestPricePerDay,
            freeGuestCount
        });
        return Room.findOne({
            where: {
                id,
            },
        });
    }
}

module.exports = RoomsService;
