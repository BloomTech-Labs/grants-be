const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

const apiRouter = require('./api-router.js');

server.get('/', (req, res) => {
  res.status(200).json({
    message: "Server Running!"
  });
});

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api', apiRouter);

module.exports = server;