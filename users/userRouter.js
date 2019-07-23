const router = require('express').Router();

const Auth = require('../auth/auth-model');
const restricted = require('../middleware/restricted-middleware');

// route to request all users
router.get('/', restricted, (req, res) => {
  Auth.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error));
});

module.exports = router;
