exports.up = function(knex) {
  return knex.schema.createTable('auth', tbl => {
    tbl.increments();

    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl
      .string('password', 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('auth');
};
