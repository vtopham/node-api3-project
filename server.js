const express = require('express');

const server = express();

server.use(express.json())

server.use(logger)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  res.status(200).json({method: req.method, url: req.url, time: new Date().toISOString()})
  console.log(req)

  next();
}


module.exports = server;
