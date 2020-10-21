const express = require("express");
const Passes = require("./passes-model");
const {
  clientLoggedIn,
  instructorLoggedIn,
} = require("../auth/restrictedMiddleware");

const router = express.Router();

router.get("/", instructorLoggedIn, (req, res) => {
  Passes.getPasses()
    .then((activity) => {
      console.log("getPasses", activity);
      res.status(200).json(activity);
    })
    .catch((error) => {
      console.log("getPasses error", error);
      res
        .status(500)
        .json({ message: "Sorry, no passes return from the server", error });
    });
});

router.post("/", instructorLoggedIn, (req, res) => {
    const pass = {
        ...req.body,
        instructor_id: req.user_id
    }
    console.log(pass)
    Passes.createPass(pass)
    .then((activity) => {
        res.status(201).json(activity);
      })
      .catch((error) => {
        res
          .status(500)
          .json(error);
      });
})

module.exports = router;
