const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment_controller');

//creation commentaire
router.post('/', commentController.createComment);

//modification commentaire
router.put('/:id', commentController.modifyComment);

//suppression commentaire
router.delete('/:id', commentController.deleteComment);

//récupérer un commentaire
router.get('/:id', commentController.getComment);

//récupérer tous les commentaires
router.get('/', commentController.getAllComment);

//récupérer les commentaires d'un post
router.get('/post/:id', commentController.getCommentsByPost);

//récupérer les commentaires d'un utilisateur
router.get('/user/:id', commentController.getCommentsByUser);


module.exports = router;
