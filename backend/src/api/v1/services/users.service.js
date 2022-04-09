const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

class UsersService {
  static async getUserByEmail(email) {
    if (!email) {
      throw Error("No email specified");
    } else {
      return User.findOne({
        where: {
          email,
        },
      });
    }
  }
  static async getUserById(id) {
    if (!id) {
      throw Error("No id specified");
    } else {
      return User.findOne({
        where: {
          id,
        },
      });
    }
  }
  static async createUser(userParams) {
    console.log("In create user");
    let { email, firstName, lastName, password } = userParams;
    // Check the email is not in use already
    const isEmailUsed = await this.getUserByEmail(email);
    if (isEmailUsed) {
      throw Error("email already in use");
    }

    let passwordHash = null;

    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }
    const id = uuidv4();
    const createdUser = await User.create({
      id,
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    return User.findOne({
      where: {
        id,
      },
    });
  }
}

module.exports = UsersService;
