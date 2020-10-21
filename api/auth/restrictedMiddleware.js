const jwt = require('jsonwebtoken')

module.exports = {
    clientLoggedIn,
    instructorLoggedIn
}

function clientLoggedIn (req, res, next) {
    const token = req.headers.authorization

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({err: 'you dont have access'})
            } else {
                next()
            }
        })
    } else {
        res.status(401).json({message: "missing token in authentication header"})
    }
}

function instructorLoggedIn (req, res, next) {
    const token = req.headers.authorization

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({err: 'you dont have access'})
            } else {
                if (decoded.role === 'instructor') {
                    next()
                } else {
                    res.status(401).json({err: 'Must be logged in as an instructor to access this endpoint'})
                }
            }
        })
    } else {
        res.status(401).json({message: "missing token in authentication header"})
    }
}