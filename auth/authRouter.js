const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const Auth = require('./auth-model');

router.use(express.json());

// just the normal route to api
router.get('/', (req, res) => {
  try {
    res.status(200).json({ message: `Hello.` });
  } catch (error) {
    res.status(500).json(error);
  }
});

// route to request all users
router.get('/users', (req, res) => {
  Auth.find()
    .then(user => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// route to create a user
router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Auth.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
