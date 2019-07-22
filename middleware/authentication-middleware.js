const bcrypt = require('bcrypt');
const Auth = require('../auth/auth-model');

function authenticate(req, res, next) {
  const { username, password } = req.headers;

  Auth.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: `You shall not pass.` });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = authenticate;
