const db = require("../../database/connection");

module.exports = {
    getPasses
}

function getPasses() {
    return db('passes')
}