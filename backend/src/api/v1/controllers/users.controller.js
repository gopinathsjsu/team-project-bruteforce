class UsersController {
    static async createUser(req, res) {
        try {
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
