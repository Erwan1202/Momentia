const express = require('express');
const followController = require('../controllers/follow_controller');

const router = express.Router();

// Route pour suivre un utilisateur
router.post('/', followController.followUser);

// Route pour se désabonner
router.delete('/:id', followController.unfollowUser);

// Route pour récupérer les abonnés d'un utilisateur
router.get('/followers/:userId', followController.getFollowers);

// Route pour récupérer les abonnements d'un utilisateur
router.get('/following/:userId', followController.getFollowing);

module.exports = router;
