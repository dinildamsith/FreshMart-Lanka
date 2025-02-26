const  jwt = require('jsonwebtoken');



const SECRET_KEY = "k90djjsnkldawbjdadkiadawdadwlknawdnnadwad"

const generateToken = (user) => {
    return jwt.sign({user}, SECRET_KEY, {expiresIn: '24h'});
}

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({message: 'No token provided!'});
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: 'Unauthorized!'});
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = {generateToken, verifyToken};