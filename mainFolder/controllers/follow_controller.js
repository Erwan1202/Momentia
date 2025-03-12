const Follow = require('../models/Follow');

//creation follow
exports.createFollow = (req, res, next) => {
    try {
        const follow = new Follow.createFollow({
            user_id: req.body.user_id,
            follower_id: req.body.follower_id});
            res.status(201).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//suppression follow
exports.deleteFollow = (req, res, next) => {
    try {
        const follow = Follow.deleteFollow(req.params.id);
        res.status(200).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation follow par user
exports.getFollowByUser = (req, res, next) => {
    try {
        const follow = Follow.getFollowByUser(req.params.id);
        res.status(200).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation follow par follower
exports.getFollowByFollower = (req, res, next) => {
    try {
        const follow = Follow.getFollowByFollower(req.params.id);
        res.status(200).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation follow par user et follower
exports.getFollowByUserAndFollower = (req, res, next) => {
    try {
        const follow = Follow.getFollowByUserAndFollower(req.params.user_id, req.params.follower_id);
        res.status(200).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation follow par user email
exports.getFollowByUserEmail = (req, res, next) => {
    try {
        const follow = Follow.getFollowByUserEmail(req.params.email);
        res.status(200).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation follow par follower email
exports.getFollowByFollowerEmail = (req, res, next) => {
    try {
        const follow = Follow.getFollowByFollowerEmail(req.params.email);
        res.status(200).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation de tous les follow
exports.getAllFollow = (req, res, next) => {
    try {
        const follow = Follow.getAllFollow();
        res.status(200).json(follow);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}