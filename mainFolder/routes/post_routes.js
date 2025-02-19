const express = require('express');
const postController = require('../controllers/post_controller');

const router = express.Router();

// Route pour créer un post
router.post('/', postController.createPost);

// Route pour récupérer tous les posts
router.get('/', postController.getAllPosts);

// Route pour récupérer un post par ID
router.get('/:id', postController.getPostById);

// Route pour supprimer un post
router.delete('/:id', postController.deletePost);

module.exports = router;
