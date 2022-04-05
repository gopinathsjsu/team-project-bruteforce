const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const JWTService = require("./jwt.service");
const UserService = require("./users.service");

class AuthService {
  static async loginUser(userLoginParams) {
    console.log("logging.....");
    const { email, password } = userLoginParams;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw Error("Invalid email");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw Error("Invalid password");
    }
    const token = JWTService.generateJWT(user.id);
    return { user, token };
  }
}

module.exports = AuthService;
