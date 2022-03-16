const { Room, Amenities} = require("../models");
const { v4: uuidv4 } = require('uuid');

class RoomsService {
    static async getRoomById(id) {
        if (!id) {
            throw Error('No id specified');
        } else {
            return Room.findOne({
                where: {
                    id,
                },
                include: [Amenities]
            });
        }
    }
    static async addRooms(roomParams) {
        let { name, type, pricePerDay, guestPricePerDay, freeGuestCount, roomsCount, HotelId } = roomParams;
        const id =  uuidv4();
        let activeCount = roomsCount;
        // find the room by the type specified
        const room = await Room.findOne({
            where: {
                type,
                HotelId
            }
        });
        if (room) {
            activeCount += room.activeCount;
            // update the room
            room.activeCount = activeCount;
            room.roomsCount += roomsCount;
            await room.save();
        } else {
            // create the room
            const createdRoom = await Room.create({
                id,
                name,
                type,
                pricePerDay,
                guestPricePerDay,
                freeGuestCount,
                roomsCount,
                activeCount,
            });
        }

        return Room.findOne({
            where: {
                id,
            },
        });
    }
}

module.exports = RoomsService;
