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
  postDb.getById(req.params.id).then(post => {
    res.status(200).json({data: post})
  }).catch(error => {
    res.status(500).json({message: "error retrieving post", error: error})
  })
});

//delete post by id
router.delete('/:id', (req, res) => {
  // do your magic!
});

//edit post by id
router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  postDb.getById(req.params.id).then(resource => {
    if(resource) {
      next()
    } else {
      res.status(400).json({message: "invalid post id"})
    }
  })
}

module.exports = router;
