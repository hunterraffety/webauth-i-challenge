// dependencies
const router = require('express').Router();
const bcrypt = require('bcrypt');

// db model
const Auth = require('./auth-model');

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
        req.session.username = user.username;
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: `Invalid credentials.` });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: `Oh no.` });
      } else {
        res.status(200).json({ message: `Later, alligator.` });
      }
    });
  } else {
    res.status(200).json({ message: 'Error' });
  }
});

module.exports = router;
