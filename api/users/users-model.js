const db = require("../../database/connection");

module.exports = {
  addUser,
  createUser,
  getUsers,
  getUserBy,
  getUserById,
  findBy,
  updateUser,
  deleteUser
};

//CRUD
//Create
function addUser(user) {
  return db('users')
    .insert(user, 'id')
}

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

function getUserById(id) {
  return db('users')
    .where('id', id)
    .first();
}
//same as above? 
function findBy(user) {
  return db('users')
    .where('username', user)
    .first();
}
//update

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(() => getUserById(id))
}

//delete

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}
