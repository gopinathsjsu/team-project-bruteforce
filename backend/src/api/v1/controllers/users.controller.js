const Joi = require('joi');
const UsersService = require("../services/users.service");

class UsersController {
    static async createUser(req, res) {
        try {
            const schema = Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().email({ minDomainSegments: 2 }),
                phone: Joi.string().required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            });
            await schema.validateAsync(req.body);
            const user = await UsersService.createUser(req.body)
            res.status(200).send({
                success: true,
                data: {
                    user: {},
                }
            });
        } catch (e) {
            const message = e.message || 'Error occurred while creating the user.'
            res.status(400).send({success:false, message})
        }
    }
}

module.exports = UsersController;
