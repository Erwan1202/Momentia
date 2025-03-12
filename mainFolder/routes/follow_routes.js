const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow_controller');

//creation follow
router.post('/', followController.createFollow);

//suppression follow
router.delete('/:id', followController.deleteFollow);

//recuperation follow par user
router.get('/user/:id', followController.getFollowByUser);

//recuperation follow par follower
router.get('/follower/:id', followController.getFollowByFollower);

//recuperation follow par user et follower
router.get('/user/:user_id/follower/:follower_id', followController.getFollowByUserAndFollower);

module.exports = router;
