const express = require('express');

const server = express();

server.use(express.json())

server.use(logger)
server.use(validateUserId("1"))

server.get('/',(req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

//logger
function logger(req, res, next) {
  console.log({method: req.method, url: req.url, time: new Date().toISOString()})
  next();
}

//check the userid
function validateUserId(userId) {

  return function(req, res, next) {
    if(!req.headers.id) {
      res.status(400).json({message: "please include a user id in your header"})
    } else {
      const id = req.headers.id
      if (id === userId) {
        next();
      } else {
        res.status(400).json({message: "invalid user id"})
      }

    }
  }
}


module.exports = server;
