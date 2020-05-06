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

//validates the user , to be used on a request to create a new user
function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({message: "missing user data"})
  } else if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }

}


//validates the body on a request to make a new post
function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = server;
