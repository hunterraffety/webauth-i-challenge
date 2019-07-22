const db = require('../database/db-config');

module.exports = {
  find
};

function find() {
  return db('auth').select('id', 'username', 'password');
}
