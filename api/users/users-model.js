const db = require("../../database/connection");

module.exports = {
  addUser,
  // createUser,
  getUsers,
  getUserBy,
  getUserById,
  findBy,
  updateUser,
  deleteUser
};

//CRUD
//Create
async function addUser(user) {
  // return db('users')
  //   .insert(user, 'id')
  const id = await db("users").insert(user);
  return getUserBy("id", id[0]);
}

// async function createUser(obj) {
//   const id = await db("users").insert(obj);
//   return getUserBy("id", id[0]);
// }

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
function findBy(username) {
  return db('users')
    .where('username', username)
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
