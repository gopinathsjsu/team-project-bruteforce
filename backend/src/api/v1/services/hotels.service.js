const { Hotel} = require("../models");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");


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
}

module.exports = HotelsService;
