const db = require("../../database/connection");

module.exports = {
  createReservation,
  getReservationBy,
  removeReservation
};

//CRUD
//Create

async function createReservation(obj) {
  const id = await db("reservations").insert(obj);
  return getClassBy("id", id[0]);
}

//Read

function getReservationBy(column, value) {
  return db("reservations").where(column, value);
}

//Delete
function removeReservation(id) {
    return db("reservations").where({ id }).del()
}