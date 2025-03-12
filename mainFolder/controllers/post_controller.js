const Post = require('../models/Post');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//creation post
exports.createPost = (req, res, next) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId
        });
        post.save().then(() => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//modification post
exports.modifyPost = (req, res, next) => {
    try {
        const post = new Post({
            _id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId
        });
        Post.updateOne({ _id: req.params.id }, post).then(() => {
            res.status(201).json({
                message: 'Post updated successfully!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//suppression post
exports.deletePost = (req, res, next) => {
    try {
        Post.deleteOne({ _id: req.params.id }).then(() => {
            res.status(200).json({
                message: 'Post deleted successfully!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}


//recuperation post
exports.getOnePost = (req, res, next) => {
    try {
        Post.findOne({ _id: req.params.id }).then((post) => {
            res.status(200).json(post);
        }).catch((error) => {
            res.status(404).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation de tous les posts
exports.getAllPosts = (req, res, next) => {
    try {
        Post.find().then((posts) => {
            res.status(200).json(posts);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation de tous les posts d'un utilisateur
exports.getAllPostsByUser = (req, res, next) => {
    try {
        Post.find({ userId: req.params.id }).then((posts) => {
            res.status(200).json(posts);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation des posts par pagear date decroissante
export const getPostsByDate = (req, res, next) => {
    try{
        Post.find().sort({created_at: -1}).then((posts) => {
            res.status(200).json(posts);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
}catch (error) {
    res.status(500).json({
        error: error
    });
}

}