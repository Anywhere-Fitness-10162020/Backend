const { max } = require("../../database/connection");
const db = require("../../database/connection");

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  removeReservation,
};

//CRUD
//Create

async function createReservation(obj) {
  const classObj = await db("classes").where("id", obj.class_id);
  console.log("classObj", classObj[0]);
  const attendeeCount = classObj[0].attendee_count;
  console.log("attendeeCount", attendeeCount);
  const maxAttendees = classObj[0].max_attendees;
  console.log("maxAttendees", maxAttendees);

  if (attendeeCount < maxAttendees) {
    const newAttendeeCount = attendeeCount + 1;
    db("classes")
      .where("id", obj.class_id)
      .update({ attendee_count: newAttendeeCount })
      .then((updateRes) => {
        console.log("updateRes", updateRes);
      })
      .catch((updateErr) => {
        console.log("updateErr", updateErr);
      });
    return db("attendees").insert(obj);
  } else {
    console.log("this class is full");
    return "class full";
  }
}

//Read

function getReservations() {
  return db("attendees");
}

function getReservationById(id) {
  return db("attendees").where("id", id);
}

// function getReservationBy(column, value) {
//   return db("reservations").where(column, value);
// }

//Delete
function removeReservation(id) {
  return db("attendees").where("id", id).del();
}
