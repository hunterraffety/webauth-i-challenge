const server = require('./server');

server.listen(4000, () => {
  console.log(`ok, running, what more do you want?`);
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
