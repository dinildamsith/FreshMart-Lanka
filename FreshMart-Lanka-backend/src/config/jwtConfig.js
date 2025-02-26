const  jwt = require('jsonwebtoken');



//----------- Generate Token ------------
const generateToken = (user) => {
    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, process.env.SECRET_KEY , {expiresIn: '24h'});
}


//----------- Verify Token ------------
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ","");

    if (!token) {
        return res.status(403).send({message: 'No token provided!'});
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: 'Unauthorized!'});
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = {generateToken, verifyToken};