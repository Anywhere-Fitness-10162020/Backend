const db = require("../../database/connection");

module.exports = {
  createUser,
  getUsers,
  getUserBy
};

//CRUD
//Create

async function createUser(obj) {
  const id = await db("users").insert(obj);
  return getUserBy("id", id[0]);
}

//Read

function getUsers() {
  return db("users");
}
function getUserBy(column, value) {
  return db("users").where(column, value);
}