const db = require('../config/db');

// Liker un post
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

// Enlever un like
exports.unlikePost = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM likes WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Like supprimé avec succès' });
    });
};

// Récupérer les likes d'un post
exports.getLikesByPost = (req, res) => {
    const { postId } = req.params;
    const query = 'SELECT * FROM likes WHERE post_id = ?';
    
    db.query(query, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};
