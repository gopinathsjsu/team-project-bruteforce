const { v4: uuidv4 } = require('uuid');
const JWT = require('jsonwebtoken');
const { User } = require("../models");

const JWT_SECRET = '04i-213u4-0834';

class JwtService {
    static validJWTs = {};
    static generateJWT(userId) {
        const payload = {
            userId,
            random: uuidv4(),
            expireAt: "1000d",
        };
        return JWT.sign(payload, JWT_SECRET);
    }

    static async addJWTToken({jwtToken, user}) {
        if (this.validJWTs[user.id]) {
            this.validJWTs[user.id].push(jwtToken);
        } else {
            this.validJWTs[user.id] = [jwtToken];
        }
    }

    static async removeJWTToken({jwtToken, user}) {
        if (this.validJWTs[user.id]) {
            const index = this.validJWTs[user.id].indexOf(jwtToken);
            if (index >= 0) {
                this.validJWTs[user.id].splice(index, 1);
            }
        }
    }

    static async getUserFromJWT(jwtToken){
        try {
            const decoded = JWT.verify(jwtToken, JWT_SECRET);
            const {userId} = decoded;
            return await User.findByPk(userId, {raw: true});
        } catch (e) {
            return null;
        }
    }
}

module.exports = JwtService;
