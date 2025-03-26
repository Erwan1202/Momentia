const express = require('express');
const router = express.Router();
const dislikeController = require('../controllers/dislike_controller');

router.get('/', dislikeController.getAllDislike);

router.get('/:id', dislikeController.getDislikeById);

router.post('/', dislikeController.createDislike);

router.delete('/:id', dislikeController.deleteDislike);

router.get('/user/:id', dislikeController.getDislikeByUser);

router.get('/post/:id', dislikeController.getDislikeByPost);

router.get('/comment/:id', dislikeController.getDislikeByComment);

module.exports = router;