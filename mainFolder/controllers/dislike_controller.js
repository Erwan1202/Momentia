const Dislike = require('../models/Dislike');

exports.getAllDislike = async (req, res) => {
    try {
        const dislikes = await Dislike.getAllDislike();
        res.json(dislikes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getDislikeById = async (req, res) => {
    try {
        const dislike = await Dislike.getDislikeById(req.params.id);
        res.json(dislike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.createDislike = async (req, res) => {
    try {
        const dislike = await Dislike.createDislike(req.body);
        res.json(dislike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteDislike = async (req, res) => {
    try {
        const dislike = await Dislike.deleteDislike(req.params.id);
        res.json(dislike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getDislikeByUser = async (req, res) => {
    try {
        const dislike = await Dislike.getDislikeByUser(req.params.id);
        res.json(dislike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getDislikeByPost = async (req, res) => {
    try {
        const dislike = await Dislike.getDislikeByPost(req.params.id);
        res.json(dislike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getDislikeByComment = async (req, res) => {
    try {
        const dislike = await Dislike.getDislikeByComment(req.params.id);
        res.json(dislike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

