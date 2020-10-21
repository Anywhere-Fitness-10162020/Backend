const express = require("express");
const { clientLoggedIn, instructorLoggedIn } = require("../auth/restrictedMiddleware")
const Users = require('./users-model');
const Classes =require('../classes/classes-model')
const router = express.Router();

module.exports = router;


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

// GET CLASSES BY USER ID

router.get('/:id/reservations', clientLoggedIn, (req, res) => {
  console.log(req.user_id)
  console.log(req.params.id)
  if (req.user_id == req.params.id) {
    Classes.getClassByUserId(req.user_id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'sorry something is wrong with the server' });
      });
  } else {
    res.status(401).json({ message: "you aren't logged in as that user. User_id must match the id parameter in the URL" });
  }
  });

// PUT(Update user)

// router.put('/:id', clientLoggedIn, (req, res) => {
//   Users.updateUser(req.params.id, req.body)
//     .then(user => {
//       console.log(req.body);
//       res.status(201).json(user);
//     })
//     .catch(err => {
//       res.status(500).json({ error: ' something went wrong in the server' });
//     });
// });

//DELETE User

// router.delete('/:id', (req, res) => {
//   const deletedId = req.params.id;

//   Users.deleteUser(deletedId)
//     .then(user => {
//       res.status(200).json(`id ${deletedId} was deleted`);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: 'error with the server' });
//     });
// });

module.exports = router;