const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

exports.protect = async(req, res, next) => {
    let token;
    if (req.cookies.token) {
        token = req.cookies.token;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.student = await Student.findById(decoded.id);
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};