const express = require("express");
const dbFun = require("./reservations-model");
const { clientLoggedIn, instructorLoggedIn } = require("../auth/restrictedMiddleware");

const router = express.Router();

router.get("/", instructorLoggedIn, (req, res) => {
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

router.post("/", clientLoggedIn, (req, res) => {
  const reservation = {
    user_id: req.user_id,
    class_id: req.body.class_id
  }
  dbFun
    .createReservation(reservation)
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

router.delete("/:id", clientLoggedIn, (req, res) => {
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
