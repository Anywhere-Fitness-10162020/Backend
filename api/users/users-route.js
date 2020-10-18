const express = require("express");
const dbFun = require("./users-model");
const restricted = require('../auth/restricted-middleware');
const Users = require('./users-model')
const router = express.Router();

module.exports = router;


// begin




//getUsers --> returns a list of all 'users' --> from endpoint --> /api/users


//removed 'restricted' for get all users to work
router.get('/', (req, res) => {
  //add logic here
  Users.getUsers()
    .then(users => {
      // console.log('inside all getUsers', users);
      res.status(200).json(users);
    })
    .catch(error => {
      console.log('inside getUsers error', error);
      res.status(500).json({ message: 'Sorry, no users returned from the server', error });
    });
});

//getUserById --> returns a list of a single 'user' by 'id' ---> from endpoint ---> /api/user/:id
router.get('/:id', (req, res) => {
  //add logic here
  const userId = req.params.id;

  Users.getUserById(userId)
    .then(user => {
      // console.log('inside getUserById', user);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Sorry, user with that id not found' });
      }
    })
    .catch(error => {
      console.log('inside getUserById error', error);
      res.status(500).json({ message: 'Sorry, no user with that id returned from the server', error });
    });
});

// PUT(Update user)

router.put('/:id', (req, res) => {
  Users.updateUser(req.params.id, req.body)
    .then(user => {
      console.log(req.body);
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: ' something went wrong in the server' });
    });
});

//DELETE User

router.delete('/:id', (req, res) => {
  const deletedId = req.params.id;

  Users.deleteUser(deletedId)
    .then(user => {
      res.status(200).json(`id ${deletedId} was deleted`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error with the server' });
    });
});

module.exports = router;