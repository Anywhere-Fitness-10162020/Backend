const db = require("../../database/connection");

module.exports = {
  createReservation,
  getReservationBy,
  removeReservation
};

//CRUD
//Create

async function createReservation(obj) {
  return db("attendees").insert(obj);
  // const id = await db("attendees").insert(obj);
  // return getReservationBy("id", id[0]);
}

//Read

function getReservationBy(column, value) {
  return db("reservations").where(column, value);
}

//Delete
function removeReservation(id) {
    return db("reservations").where({ id }).del()
}