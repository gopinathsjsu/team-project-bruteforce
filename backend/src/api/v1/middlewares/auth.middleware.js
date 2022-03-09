const JWTService = require("../services/jwt.service");

const authMiddleware = async function (req, res, next) {
    if(!req.headers.authorization){
        res.status(401).send('Unauthorized');
        return;
    }
    const token = req.headers.authorization.split('Bearer ')[1];
    if(!token){
        res.status(401).send('No authtoken');
        return;
    }
    const user = await JWTService.getUserFromJWT(token);
    if(!user) {
        res.status(401).send('Expired authtoken');
        return;
    }
    req.user = user;
    next()
}

module.exports = authMiddleware;
