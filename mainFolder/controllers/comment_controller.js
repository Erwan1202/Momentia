const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// poster un commentaire
exports.postComment = (req, res) => {
    const { user_id, post_id, content } = req.body;
    const query = 'INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)';
    db.query(query, [user_id, post_id, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Commentaire posté avec succès', id: result.insertId });
    });
};

// récupérer tous les commentaires
exports.getAllComments = (req, res) => {
    const query = 'SELECT * FROM comments';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer un commentaire
exports.getComment = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM comments WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        res.json(result[0]);
    });
};

// supprimer un commentaire
exports.deleteComment = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM comments WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Commentaire supprimé avec succès' });
    });
};

// modifier un commentaire
exports.updateComment = (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const query = 'UPDATE comments SET content = ? WHERE id = ?';
    db.query(query, [content, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Commentaire modifié avec succès' });
    });
};

// liker un commentaire
exports.likeComment = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE comments SET likes = likes + 1 WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Commentaire liké avec succès' });
    });
};

// disliker un commentaire
exports.dislikeComment = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE comments SET likes = likes - 1 WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Commentaire disliké avec succès' });
    });
};

// récupérer les commentaires par likes
exports.getCommentByLikes = (req, res) => {
    const query = 'SELECT * FROM comments ORDER BY likes DESC';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer les commentaires par date
exports.getCommentByDate = (req, res) => {
    const query = 'SELECT * FROM comments ORDER BY created_at DESC';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer les commentaires par post
exports.getCommentByPost = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM comments WHERE post_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer les commentaires par post et user
exports.getCommentByPostAndUser = (req, res) => {
    const { post_id, user_id } = req.params;
    const query = 'SELECT * FROM comments WHERE post_id = ? AND user_id = ?';
    db.query(query, [post_id, user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer les commentaires par post et date
exports.getCommentByPostAndDate = (req, res) => {
    const { post_id } = req.params;
    const query = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC';
    db.query(query, [post_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer les commentaires par user
exports.getCommentByUser = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM comments WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

