const jwt = require('jsonwebtoken');

exports.validate = (req, res, next) => {
    const token = req.headers['auth_token'] || null;
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (decoded) {
        req.user = decoded.id;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}