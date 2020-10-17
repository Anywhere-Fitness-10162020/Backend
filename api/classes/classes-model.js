const db = require("../../database/connection");

module.exports = {
  createClass,
  getClasses,
  getClassBy,
  updateClass,
  removeClass
};

//CRUD
//Create

async function createClass(obj) {
  const id = await db("classes").insert(obj);
  return getClassBy("id", id[0]);
}

//Read

function getClasses() {
  return db("classes");
}
function getClassBy(column, value) {
  return db("classes").where(column, value);
}

//Update
function updateClass(changedObj, id) {
  return db("classes").where({ id }).update(changedObj);
}

//Delete
function removeClass(id) {
    return db("classes").where({ id }).del()
}