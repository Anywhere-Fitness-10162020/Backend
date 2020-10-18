const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/middleware')
const Users = require('../users/users-model')
const router = express.Router()




router.post('/register', middleware.verifyRegister, async(req, res) => {
  try {
  
    const newUser = req.body;
    const { password } = newUser
  
    const hash = bcrypt.hashSync(password, 10);
  
    const savedUser = await Users.addUser({...newUser, password: hash})
    res.status(200).json({message: 'new user created'})
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
     res.status(200).json({  message: `Welcome ${persistedUser.username}.`, token })
  
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
      user
    };
  
    const options = {
      expiresIn: '1d'
    };
  
    console.log(process.env.JWT_SECRET)
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
  
  module.exports = router;