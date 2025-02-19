const db = require('../config/db');

// Ajouter un commentaire
exports.createComment = (req, res) => {
    const { user_id, post_id, content } = req.body;

    const query = 'INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)';
    db.query(query, [user_id, post_id, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Commentaire ajouté avec succès', id: result.insertId });
    });
};

// Récupérer les commentaires d'un post
exports.getCommentsByPost = (req, res) => {
    const { postId } = req.params;
    const query = 'SELECT * FROM comments WHERE post_id = ?';
    
    db.query(query, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};
