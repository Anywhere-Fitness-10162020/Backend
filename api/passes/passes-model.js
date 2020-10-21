const db = require("../../database/connection");

module.exports = {
    getPasses,
    getPassById,
    createPass
}

function getPasses() {
    return db('passes')
}

function getPassById(id) {
    return db("passes").where("id", id).first();
}

async function createPass(obj) {
    db("passes").insert(obj);
    const id = await db("passes").insert(obj);
    return getPassById(id[0]);
  }