const db = require('../config/db');

// Créer un post
exports.createPost = (req, res) => {
    const { user_id, caption, image_url, location } = req.body;

    const query = 'INSERT INTO posts (user_id, caption, image_url, location) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, caption, image_url, location], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Post créé avec succès', id: result.insertId });
    });
};

// Récupérer tous les posts
exports.getAllPosts = (req, res) => {
    const query = 'SELECT * FROM posts';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// Récupérer un post par ID
exports.getPostById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM posts WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }
        res.json(result[0]);
    });
};

// Supprimer un post
exports.deletePost = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM posts WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Post supprimé avec succès' });
    });
};
