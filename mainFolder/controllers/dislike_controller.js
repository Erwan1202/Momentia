const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// disliker un post
exports.dislikePost = (req, res) => {
    const { user_id, post_id } = req.body;
    const query = 'DELETE FROM dislikes WHERE user_id = ? AND post_id = ?';
    db.query(query, [user_id, post_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Post disliké avec succès' });
    });
};

// récupérer les dislikes par post
exports.getDislikeByPost = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM dislikes WHERE post_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer les dislikes par user
exports.getDislikeByUser = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM dislikes WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};


// disliker un commentaire
exports.dislikeComment = (req, res) => {
    const { user_id, comment_id } = req.body;
    const query = 'DELETE FROM dislikes_comments WHERE user_id = ? AND comment_id = ?';
    db.query(query, [user_id, comment_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Commentaire disliké avec succès' });
    });
};

// récupérer les dislikes par commentaire
exports.getDislikeByComment = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM dislikes_comments WHERE comment_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer les dislikes par user
exports.getDislikeByUser = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM dislikes_comments WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

