const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like_controller');

//creation like
router.post('/', likeController.createLike);

//suppression like
router.delete('/:id', likeController.deleteLike);

//recuperation de tous les likes
router.get('/', likeController.getAllLikes);

//recuperation d'un like
router.get('/:id', likeController.getLikeById);

//recuperation des likes par post
router.get('/post/:id', likeController.getLikesByPost);

//recuperation des likes par commentaire
router.get('/comment/:id', likeController.getLikeByComment);

module.exports = router;