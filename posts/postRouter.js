const express = require('express');
const postDb = require('./postDb.js')

const router = express.Router();

//get all posts
router.get('/', (req, res) => {
  postDb.get().then(posts => {
    res.status(200).json({data: posts})
  }).catch(error => {
    res.status(500).json({message: "error retrieving posts", error: error})
  })
});

//get post by id
router.get('/:id', validatePostId, (req, res) => {
  postDb.getById(req.post).then(post => {
    res.status(200).json({data: post})
  }).catch(error => {
    res.status(500).json({message: "error retrieving post", error: error})
  })
});

//delete post by id
router.delete('/:id', validatePostId, (req, res) => {
  postDb.remove(req.post).then(removed => {
    res.status(200).json({message: "post was successfully removed"})
  }).catch(error => {
    res.status(500).json({message: "error deleting post", error: error})
  })
});

//edit post by id
router.put('/:id', validatePostId, validatePost, (req, res) => {
  postDb.update(req.post, req.body).then(updated => {
    res.status(200).json({message: "The post was updated successfully"})
  }).catch(error => {
    res.status(500).json({message: "error updating post", error: error})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  postDb.getById(req.params.id).then(resource => {
    if(resource) {
      req.post = req.params.id;
      next();
    } else {
      res.status(400).json({message: "invalid post id"})
    }
  })
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = router;
