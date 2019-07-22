const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const router = express.Router();

const Auth = require('./auth-model');
const authenticate = require('../middleware/authentication-middleware');
const restricted = require('../middleware/restricted-middleware');

router.use(
  session({
    name: 'connect.sid', // default is connect.sid
    secret: 'testtest',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false
  })
);
router.use(express.json());

// just the normal route to api
router.get('/', (req, res) => {
  try {
    res.status(200).json({ message: `Hello.` });
  } catch (error) {
    res.status(500).json(error);
  }
});

// test to restricted route
router.get('/restricted', restricted, (req, res) => {
  try {
    res.status(200).json({ message: `Hello.` });
  } catch (error) {
    res.status(500).json(error);
  }
});

// session test
router.get('/greet', (req, res) => {
  const name = req.session.name;
  if (name) {
    res.send(`hello ${req.session.name}`);
  } else {
    res.send(`log in please.`);
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
  req.session.name = username;

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

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: `Oh no.` });
      } else {
        res.json({ message: `Later, alligator.` });
      }
    });
  } else {
    res.json({ message: 'Error' });
  }
});

module.exports = router;
