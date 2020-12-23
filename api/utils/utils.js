const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    return token;
}