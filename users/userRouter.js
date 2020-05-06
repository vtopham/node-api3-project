const express = require('express');
const userDb = require('./userDb.js')
const postDb = require('../posts/postDb')

const router = express.Router();



//add a new user
router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body).then(resource => {
    res.status(201).json({message: "successfully created user", data: resource})
  }).catch(error => {
    res.status(500).json({message: "error storing new user", error: error})
  })
});

//add a new post
router.post('/:id/posts', (req, res) => {
  // do your magic!
});

//get users
router.get('/', (req, res) => {
  userDb.get().then(users => {
    res.status(200).json({data: users})
  }).catch(_ => {
    res.status(500).json({message: "error retrieving list of users"})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

//run this when you want to validate that the userId in the header exists
function validateUserId(req, res, next) {
  //validate that there's a header.id
  if(!req.headers.id) {
    res.status(400).json({message: "please include a user id in your header"})
  } else {
    const id = req.headers.id
    //check to see if it's in the database

    userDb.getById(id).then(response => {
      if(response) {
        //if it's in the database then move on
        next();
      } else {
        //if it's not in the database, throw an error
        res.status(400).json({message: "invalid user id"})
      }
      next()
    }).catch(_ => {
      res.status(500).json({message: "error validating userID"})
    })

  }
  
}

//run this when you want to make sure that there's a user name in the body, to be used when you want to add a new user
function validateUser(req, res, next) {
  // do your magic!
  if(!req.body) {
    res.status(400).json({message: "missing user data"})
  } else if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }
}

//run this when you want to make sure that there's text in the post body, to be used when you want to add a new post
function validatePost(req, res, next) {
  // do your magic!
  if(!req.body) {
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = router;
