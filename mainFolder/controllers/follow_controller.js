const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// récupérer tous les follows d'un user
exports.getUserFollow = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM follows WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer tous les followers d'un user
exports.getUserFollower = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM follows WHERE follower_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

