const Joi = require("joi");
const AuthService = require("../services/auth.service");
const UsersService = require("../services/users.service");

class AuthController {
  static signin = async (req, res) => {
    try {
      console.log("signin try");
      const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().required(),
      });
      await schema.validateAsync(req.body);
      const user = await AuthService.loginUser(req.body);
      console.log("user logged");
      res.status(200).send({
        success: true,
        message: "Logged in successfully!",
        user,
      });
    } catch (e) {
      console.log("signin catch");
      console.log(e.message);
      const message = e.message || "Error occurred while logging in.";
      res.status(400).send({ message });
    }
  };

  static signOut = async (req, res) => {
    try {
      // Cleanup in case of sign out, if needed
      res.status(200).send({
        data: {
          message: "Logged out successfully!",
        },
      });
    } catch (e) {
      const message = e.message || "Error occurred while logging out.";
      res.status(400).send({ message });
    }
  };
  static async createUser(req, res) {
    console.log("In auth controller for create user");
    try {
      console.log("try");

      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        phone: Joi.string().required(),
        // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        password: Joi.string(),
      });
      await schema.validateAsync(req.body);
      const user = await UsersService.createUser(req.body);
      res.status(200).send({
        success: true,
        data: {
          user,
        },
      });
    } catch (e) {
      console.log("catch");
      console.log(e.message);
      const message = e.message || "Error occurred while creating the user.";
      res.status(400).send({ success: false, message });
    }
  }
}

module.exports = AuthController;
