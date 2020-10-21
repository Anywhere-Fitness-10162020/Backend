const express = require("express");
const Punches = require("./punches-model");
const { clientLoggedIn, instructorLoggedIn } = require("../auth/restrictedMiddleware");

const router = express.Router();

module.exports = router;