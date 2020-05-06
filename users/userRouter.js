const express = require('express');
const userDb = require('./userDb.js')
const postDb = require('../posts/postDb.js')

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
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  
  const newPost = {
    user_id: parseInt(req.params.id),
    text: req.body.text
  }
  
  //
  postDb.insert([newPost]).then(resource => {
    res.status(201).json({message: "post successfully created", data: resource})
  }).catch(error => {
    
    res.status(500).json({message: "error adding post to database", error: error})
  })
  
});

//get users
router.get('/', (req, res) => {
  userDb.get().then(users => {
    res.status(200).json({data: users})
  }).catch(_ => {
    res.status(500).json({message: "error retrieving list of users"})
  })
});

//get user by id
router.get('/:id', validateUserId, (req, res) => {
  userDb.getById(req.params.id).then(user => {
      //we are already validating that we will get back a user
      res.status(200).json({data: user})
  }).catch(_ => {
    res.status(500).json({message: "Error retrieving user"})
  })
});

//get posts by user id
router.get('/:id/posts', validateUserId, (req, res) => {
  postDb.getById(req.params.id).then(posts => {
    res.status(200).json({data: posts})
  }).catch(error => {
    res.status(500).json({message: "error retrieving posts", error: error})
  })
});

//delete a user by id
router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id).then(response => {
    res.status(200).json({message: "Succsesfully deleted record"})
  }).catch(error => {
    res.status(500).json({message: "error deleting user", error: error})
  })
});

//edit a user by id TODO DOES NOT WORK
router.put('/:id', validateUser, validateUserId, (req, res) => {
  console.log(req.params.id, req.body)
  userDb.update(req.params.id, req.body).then(updated => {
    res.status(200).json({message: "user updated successfully"})
  }).catch(error => {
    res.status(500).json({message: "error updating user", error: error})
  })
});

//custom middleware

//run this when you want to validate that the userId in the header exists
function validateUserId(req, res, next) {
 
    //check to see if it's in the database

    userDb.getById(req.params.id).then(response => {
      if(response) {
        //if it's in the database then move on
        next();
      } else {
        //if it's not in the database, throw an error
        res.status(400).json({message: "invalid user id"})
      }
      
    }).catch(_ => {
      res.status(500).json({message: "error validating userID"})
    })

  
  
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
