const Joi = require('joi');
const AuthService = require("../services/auth.service");

class AuthController {
  static signin = async (req, res) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().required(),
      });
      await schema.validateAsync(req.body)
      const user = await AuthService.loginUser(req.body)
      res.status(200).send({
        success: true,
        message: 'Logged in successfully!',
        user,
      });
    } catch (e) {
      const message = e.message || 'Error occurred while logging in.'
      res.status(400).send({message})
    }
  };

  static signOut = async (req, res) => {
    try {
      // Cleanup in case of sign out, if needed
      res.status(200).send({
        data: {
          message: 'Logged out successfully!',
        }
      });
    } catch (e) {
      const message = e.message || 'Error occurred while logging out.'
      res.status(400).send({message})
    }
  };
}

module.exports = AuthController;
