const db = require("../../database/connection");

//CRUD
//Create
module.exports = {
  getClasses,
  getClassById,
  getClassesBy,
  addClass,
  updateClass,
  deleteClass,
  getClassByUserId,
//   addClassByUserId,
};

//getClasses --> get a list of all 'classes' --> from endpoint --> /api/classes
function getClasses() {
  return db("classes").orderBy("classes.id");
}

//getClassById --> gets a list a single 'class' by 'id' --> from endpoint --> /api/classes/:id
function getClassById(id) {
  return db("classes").where("id", id).first();
}

// get class by any column/key
function getClassesBy(column, value){
    return db("classes").where(`${column}`, value)
}

//create new class
function addClass(activity) {
  return db("classes")
    .insert(activity, "id")
    .then((ids) => {
      console.log(ids);
      return getClassById(ids[0]);
    });
}

// update class

function updateClass(id, changes) {
  return db("classes")
    .where({ id })
    .update(changes)
    .then(() => getClassById(id));
}

// delete a class

function deleteClass(id) {
  return db("classes").where({ id }).del();
}

function getClassByUserId(userid) {
  return db("classes")
    .join("attendees", "classes.id", '=', "attendees.class_id")
    .join("users", "attendees.user_id", '=', "users.id" )
    .select(
      "classes.class_name",
      "classes.type",
      "classes.start_time",
      "classes.class_intensity_level",
      "classes.class_city",
      "classes.class_duration",
      "users.username",
      "attendees.user_id"
    )
    .where("attendees.user_id", userid);
    // return db("users").where("id", userid)
}

// deprecated - replaced by create reservation in reservations-model.js
// function addClassByUserId(userid, classidObj) {
//   const newAttendeeObj = {
//     user_id: userid,
//     class_id: classidObj.class_id,
//   };
//   return db("attendees").insert(newAttendeeObj)
// }
