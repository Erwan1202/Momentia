const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// poster une photo
exports.postPhoto = (req, res) => {
    const { user_id, url } = req.body;
    const query = 'INSERT INTO photos (user_id, url) VALUES (?, ?)';
    db.query(query, [user_id, url], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Photo postée avec succès', id: result.insertId });
    });
};

// récupérer toutes les photos
exports.getAllPhotos = (req, res) => {
    const query = 'SELECT * FROM photos';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// récupérer une photo
exports.getPhoto = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM photos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Photo non trouvée' });
        }
        res.json(result[0]);
    });
};

// supprimer une photo
exports.deletePhoto = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM photos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Photo supprimée avec succès' });
    });
};

// modifier une photo
exports.updatePhoto = (req, res) => {
    const { id } = req.params;
    const { url } = req.body;
    const query = 'UPDATE photos SET url = ? WHERE id = ?';
    db.query(query, [url, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Photo modifiée avec succès' });
    });
};

// 