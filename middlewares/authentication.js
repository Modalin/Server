const { verifyToken } = require('../helpers/jwt');
const { Investor, Mitra } = require('../config');

async function InvestorAuth(req, res, next) {
    try {
        req.decoded = verifyToken(req.headers.token);
        await Investor.findById(req.decoded.id)
            .then(user => {
                if (user) {
                    req.user_id = user._id;
                    next();
                } else {
                    return res.status(401).json({
                        message: "Sorry we don't recognize you"
                    })
                }
                return null
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } catch(err) {
        return res.status(401).json({
            message: 'Login required'
        })
    }
}

async function MitraAuth(req, res, next) {
    try {
        req.decoded = verifyToken(req.headers.token);
        await Mitra.findById(req.decoded.id)
            .then(user => {
                if (user) {
                    req.user_id = user._id;
                    next();
                } else {
                    res.status(401).json({
                        message: "Sorry we don't recognize you"
                    })
                }
                return null
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    } catch(err) {
        return res.status(401).json({
            message: 'Login required'
        })
    }
}

module.exports = { InvestorAuth, MitraAuth }