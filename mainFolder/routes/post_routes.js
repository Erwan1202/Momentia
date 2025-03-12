const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');

//creation post
router.post('/', postController.createPost);

//modification post
router.put('/:id', postController.modifyPost);

//suppression post
router.delete('/:id', postController.deletePost);

module.exports = router;
