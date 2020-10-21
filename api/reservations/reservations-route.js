const express = require("express");
const dbFun = require("./reservations-model");
const {
  clientLoggedIn,
  instructorLoggedIn,
} = require("../auth/restrictedMiddleware");

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
    class_id: req.body.class_id,
  };
  dbFun
    .createReservation(reservation)
    .then((result) => {
      res
        .status(201)
        .json(
          `user_id: ${reservation.user_id} is now registered for class_id: ${reservation.class_id} reservation id is ${result}`
        );
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "sorry something is wrong with the server", err });
    });
});

router.delete("/:id", clientLoggedIn, (req, res) => {
  dbFun
    .getReservationById(req.params.id)
    .then((resultReservation) => {
      console.log(resultReservation)
      console.log(resultReservation[0].user_id)
      console.log(req.user_id)
      if (resultReservation[0].user_id === req.user_id) {
        dbFun
          .removeReservation(req.params.id)
          .then((result) => {
            res.status(201).json({ message: "success", result });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({
                message: "sorry something is wrong with the server",
                err,
              });
          });
      } else {
        res
          .status(401)
          .json({ message: "that reservation cannot be found for this user"});
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ message: "that reservation could not be found", err });
    });
});

module.exports = router;
