const db = require('../config/db');

// Suivre un utilisateur
exports.followUser = (req, res) => {
    const { follower_id, following_id } = req.body;

    const query = 'INSERT INTO follows (follower_id, following_id) VALUES (?, ?)';
    db.query(query, [follower_id, following_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Utilisateur suivi avec succès', id: result.insertId });
    });
};

// Se désabonner
exports.unfollowUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM follows WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Abonnement supprimé avec succès' });
    });
};

// Liste des abonnés d'un utilisateur
exports.getFollowers = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM follows WHERE following_id = ?';
    
    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// Liste des abonnements d'un utilisateur
exports.getFollowing = (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM follows WHERE follower_id = ?';
    
    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};
