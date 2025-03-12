const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// liker un post
exports.likePost = (req, res) => {
    const { user_id, post_id } = req.body;
    const query = 'INSERT INTO likes (user_id, post_id) VALUES (?, ?)';
    db.query(query, [user_id, post_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Post liké avec succès', id: result.insertId });
    });
};


// récupérer tous les likes
exports.getAllLikes = (req, res) => {
    const query = 'SELECT * FROM likes';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// supprimer un like
exports.deleteLike = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM likes WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Like supprimé avec succès' });
    });
};

// liker un commentaire
exports.likeComment = (req, res) => {
    const { user_id, comment_id } = req.body;
    const query = 'INSERT INTO likes_comments (user_id, comment_id) VALUES (?, ?)';
    db.query(query, [user_id, comment_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Commentaire liké avec succès', id: result.insertId });
    });
};

// récupérer tous les likes de commentaires
exports.getAllLikesComments = (req, res) => {
    const query = 'SELECT * FROM likes_comments';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// supprimer un like de commentaire
exports.deleteLikeComment = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM likes_comments WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Like de commentaire supprimé avec succès' });
    });
};


