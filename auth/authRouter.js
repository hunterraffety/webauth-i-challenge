const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const Auth = require('./auth-model');
const authenticate = require('../middleware/authentication-middleware');

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
router.get('/users', authenticate, (req, res) => {
  Auth.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error));
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

// route to login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: `Invalid credentials.` });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
