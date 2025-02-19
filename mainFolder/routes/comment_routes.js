const express = require('express');
const commentController = require('../controllers/comment_controller');

const router = express.Router();

// Route pour ajouter un commentaire
router.post('/', commentController.createComment);

// Route pour récupérer les commentaires d'un post
router.get('/post/:postId', commentController.getCommentsByPost);

module.exports = router;
