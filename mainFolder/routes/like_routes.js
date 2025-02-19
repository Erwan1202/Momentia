const express = require('express');
const likeController = require('../controllers/like_controller');

const router = express.Router();

// Route pour liker un post
router.post('/', likeController.likePost);

// Route pour enlever un like
router.delete('/:id', likeController.unlikePost);

// Route pour récupérer les likes d'un post
router.get('/post/:postId', likeController.getLikesByPost);

module.exports = router;
