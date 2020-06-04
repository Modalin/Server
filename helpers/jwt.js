const jwt = require('jsonwebtoken');

function generateToken (payload) {
    return jwt.sign(payload, process.env.TOKEN)
}

function verifyToken (token) {
    return jwt.verify(token, process.env.TOKEN)
}

module.exports = { generateToken, verifyToken }