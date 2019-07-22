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
  Auth.add(user);
});
module.exports = router;
