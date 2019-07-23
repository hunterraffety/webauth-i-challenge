const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

module.exports = server => {
  const sessionConfig = {
    name: 'connect.sid',
    secret: 'this is a secret',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
      knex: require('../database/db-config'),
      tablename: 'sessions',
      createtable: true,
      sidfieldname: 'sid',
      clearInterval: 1000 * 60 * 60
    })
  };

  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};
