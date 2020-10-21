const express = require("express");
const dbFun = require("./classes-model");
const { clientLoggedIn, instructorLoggedIn } = require("../auth/restrictedMiddleware")

const router = express.Router();

//getClasses --> get a list of all 'classes' --> from endpoint --> /api/classes
router.get('/', clientLoggedIn, (req, res) => {
  dbFun.getClasses()
    .then(activity => {
      console.log('inside getClasses', activity);
      res.status(200).json(activity);
    })
    .catch(error => {
      console.log('inside getClasses error', error);
      res.status(500).json({ message: 'Sorry, no classes return from the server', error });
    });
});

//getClassById --> gets a list a single 'class' by 'id' --> from endpoint --> /api/classes/:id
router.get('/:id', clientLoggedIn, (req, res) => {
  const classId = req.params.id;

  dbFun.getClassById(classId)
    .then(activity => {
      console.log('inside getClassById', activity);
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(401).json({ message: 'Sorry, class with that id not found' });
      }
    })
    .catch(error => {
      console.log('inside getClassById error', error);
      res.status(500).json({ message: 'Sorry, class with that id not returned from the server', error });
    });
});

// get for searching classes by any column/key - won't work most cases because you can't have spaces in URL
// Not necessary because searching will be done faster with a filter() method on the frontend
router.get('/:key/:value', clientLoggedIn, (req, res) => {
    dbFun.getClassesBy(req.params.key, req.params.value)
    .then(activity => {
        if (activity) {
          res.status(200).json(activity);
        } else {
          res.status(401).json({ message: 'Sorry, no classes found with these parameters' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
})

// POST --> add a new class
router.post('/', instructorLoggedIn, (req, res) => {
  const newClass = req.body;

  dbFun.addClass(newClass)
    .then(activity => {
      console.log('inside addClass activity', activity);
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(401).json({ message: 'Sorry, you were unable to create a new class or activity' });
      }
    })
    .catch(error => {
      console.log('inside addClass error', error);
      res.status(500).json({ message: 'Sorry, no new class created inn the database', error });
    });
});

//PUT Update Class

router.put('/:id', (req, res) => {
  dbFun.updateClass(req.params.id, req.body)
    .then(item => {
      console.log(req.body)
      res.status(201).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'something went wrong in the server' });
    });
});

// DELETE a Class

router.delete('/:id', (req, res) => {
  const deletedID = req.params.id;
  dbFun.deleteClass(deletedID)
    .then(result => {
      res.status(201).json(`class id ${deletedID} was deleted`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong in the server' });
    });
});

// // GET CLASSS BY USER ID 

// replaced by endpoint in users to make the url structures easier for the frontend team to understand
// router.get('/:id/user_classes', (req, res) => {
//   dbFun.getClassByUserId(req.params.id)
//     .then(result => {
//       res.status(201).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: 'sorry something is wrong with the server' });
//     });
// });

// replaced by endpoint in reservations to make easier to use and understand
// router.post('/:id/user_classes', (req, res) => {
//   dbFun.addClassByUserId(req.params.id, req.body)
//     .then(result => {
//       res.status(201).json({ message: 'success', result });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: 'sorry something is wrong with the server', err });
//     });
// });
module.exports = router;