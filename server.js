require('dotenv').config()
const express = require('express');
const userDb = require('./users/userDb')

const server = express();

server.use(express.json())


server.use(logger)

server.get('/',(req, res) => {
  res.send(`<h2>${process.env.GREETING}</h2>`);
});

//custom middleware

//logger
function logger(req, res, next) {
  console.log({method: req.method, url: req.url, time: new Date().toISOString()})
  next();
}

//check the userid
// function validateUserId(req, res, next) {
 
//   // if(!req.headers.id) {
//   //   res.status(400).json({message: "please include a user id in your header"})
//   // } else {
//   //   const id = req.headers.id
//   //   //check to see if it's in the database

//   //   userDb.getById(id).then(response => {
//   //     if(response) {
//   //       next();
//   //     } else {
//   //       res.status(400).json({message: "invalid user id"})
//   //     }
//   //     next()
//   //   }).catch(_ => {
//   //     res.status(500).json({message: "error validating userID"})
//   //   })

//   // }
  

// }

//validates the user , to be used on a request to create a new user
// function validateUser(req, res, next) {
//   if(!req.body) {
//     res.status(400).json({message: "missing user data"})
//   } else if (!req.body.name) {
//     res.status(400).json({message: "missing required name field"})
//   } else {
//     next()
//   }

// }

//validates the body on a request to make a new post
// function validatePost(req, res, next) {
//   if(!req.body) {
//     res.status(400).json({message: "missing post data"})
//   } else if (!req.body.text) {
//     res.status(400).json({message: "missing required text field"})
//   } else {
//     next()
//   }
// }



module.exports = server;
