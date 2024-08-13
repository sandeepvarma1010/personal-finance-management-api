const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.header('Authorization');

    // Check if the header is present
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Split the header into "Bearer" and the token
    const token = authHeader.split(' ')[1];

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
