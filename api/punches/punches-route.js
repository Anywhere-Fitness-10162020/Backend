const express = require("express");
const Punches = require("./punches-model");
const { clientLoggedIn, instructorLoggedIn } = require("../auth/restrictedMiddleware");

const router = express.Router();

router.get('/', instructorLoggedIn, (req, res) => {
    Punches.getPunches()
    .then( punchRes => {
        res.status(200).json(punchRes)
    })
    .catch( punchErr => {
        res.status(500).json(punchErr)
    })
})

router.post('/increment', instructorLoggedIn, (req, res) => {

    Punches.punch(req.body)
    .then( punchRes => {
        res.status(200).json(punchRes)
    })
    .catch( punchErr => {
        res.status(500).json(punchErr)
    })
})

module.exports = router;