const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/middleware");
const Users = require("../users/users-model");
const router = express.Router();

router.post("/register", middleware.verifyRegister, async (req, res) => {
  try {
    const newUser = req.body;
    const { password } = newUser;
    const instructorCode = 'instructor2020'
    const hash = bcrypt.hashSync(password, 10);
  if (newUser.role === instructorCode) {
    const savedUser = await Users.addUser({...newUser, password: hash, role: 'instructor'})
    res.status(200).json({message: 'new instructor user created'})
  } else {
    Users.addUser({...newUser, password: hash, role: 'attendee'})
    .then( userRes => {
      res.status(200).json({message: 'new user created', userRes})
    })
    .catch( userErr => {
      res.status(500).json({ message: 'this username or email is likely not unique', userErr })
    })
  }
  } catch(error) {
          console.log('inside authRouter error', error);
          res.status(500).json({ message: 'Error creating new user', error });
        }
    });
  
  //login (POST) --> for endpoint beginning --> endpoing with /api/auth
  router.post('/login', async (req, res) => {
    try {
  
      const { username, password } = req.body;
  
      const persistedUser = await Users.findBy(username)
      if (!persistedUser) {
        res.status(404).json({message: 'No user found with that username'})
      }
  
      if (persistedUser && bcrypt.compareSync(password, persistedUser.password)) {
  const token = signToken(persistedUser);
     res.status(200).json({  message: `Welcome ${persistedUser.username}. Thanks for being an ${persistedUser.role} today! `, token, role: persistedUser.role })
  
      }
      else {
    res
              .status(401)
              .json({ message: "You've provided invalid credentials" });
      }
  }
        catch(error)  {
          console.log('inside authRouter findBy error', error);
          res.status(500).json({ message: 'Error logging in', error });
        }
  
    });

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: "1d",
  };

  console.log(process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
