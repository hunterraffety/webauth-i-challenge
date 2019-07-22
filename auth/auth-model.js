const db = require('../database/db-config');

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db('auth').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('auth').where(filter);
}

function add(user) {
  return db('auth')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db('auth')
    .where({ id })
    .first();
}
