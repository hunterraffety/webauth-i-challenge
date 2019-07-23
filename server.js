const express = require('express');

const authRouter = require('./auth/authRouter');
const userRouter = require('./users/userRouter');
const setupGlobalMiddleware = require('./middleware/setup-middleware');

const server = express();

setupGlobalMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  try {
    res.status(200).json({ message: `Hello.` });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
