const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('token');
    if(!token) return res.status(401).json({message: "Access denied"})

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (e) {
        res.status(400).json({ message : "Invalid Token"})
    }
    
}