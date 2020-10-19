const express = require("express");
const dbFun = require("./reservations-model");

const router = express.Router();

router.get("/", (req, res) => {
  dbFun
    .getReservations()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "sorry something is wrong with the server" });
    });
});

router.post("/", (req, res) => {
  dbFun
    .createReservation(req.body)
    .then((result) => {
      res.status(201).json({ message: "success", result });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "sorry something is wrong with the server", err });
    });
});

router.delete("/:id", (req, res) => {
    dbFun.removeReservation(req.params.id)
    .then((result) => {
        res.status(201).json({ message: "success", result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "sorry something is wrong with the server", err });
      });
})

module.exports = router;
