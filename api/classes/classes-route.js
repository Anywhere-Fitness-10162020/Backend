const express = require("express");
const server = require("../server");
const dbFun = require("./classes-model");

const router = express.Router();

//CRUD
//Create
router.post('/', (req, res) => {
    dbFun.createClass(req.body)
    .then((dbRes) => {
        res.status(201).json(dbRes);
      })
      .catch((dbErr) => {
        res.status(500).json(dbErr);
      });
})

//Read
router.get('/', (req, res) => {
    dbFun.getClasses()
    .then((dbRes) => {
        res.status(200).json(dbRes);
      })
      .catch((dbErr) => {
        res.status(500).json(dbErr);
      });
})
//Update
//Delete
module.exports = router;