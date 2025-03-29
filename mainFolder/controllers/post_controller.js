// post_controller.js
const db = require('../config/db');
const path = require('path');

// création post avec image upload
exports.createPost = (req, res) => {
    console.log("🔥 Requête reçue !");
    console.log("📦 Body :", req.body);
    console.log("📷 Fichier :", req.file);

    const { caption, location, user_id } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
        console.warn("⚠️ Aucun fichier reçu !");
        return res.status(400).json({ error: 'Aucune image fournie.' });
    }

    const imageUrl = `http://momentia.cloud/uploads/${imageFile.filename}`;
    const sql = `INSERT INTO posts (user_id, caption, image_url, location, created_at) VALUES (?, ?, ?, ?, NOW())`;
    const values = [user_id, caption, imageUrl, location];

    console.log("📤 Envoi SQL :", sql);
    console.log("🧾 Valeurs :", values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err);
            return res.status(500).json({ error: 'Erreur lors de la création du post.' });
        }
        console.log("✅ Post inséré !");
        res.status(201).json({ message: 'Post créé avec succès !' });
    });
};

// modification post (texte uniquement, sans image)
exports.modifyPost = (req, res) => {
    const { caption, location } = req.body;
    const postId = req.params.id;

    const sql = `UPDATE posts SET caption = ?, location = ? WHERE id = ?`;
    const values = [caption, location, postId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ Erreur lors de la modification du post :', err);
            return res.status(500).json({ error: 'Erreur lors de la modification du post.' });
        }
        res.status(200).json({ message: '✅ Post modifié avec succès !' });
    });
};

// suppression post
exports.deletePost = (req, res) => {
    const postId = req.params.id;
    db.query('DELETE FROM posts WHERE id = ?', [postId], (err, result) => {
        if (err) {
            console.error('❌ Erreur lors de la suppression du post :', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression du post.' });
        }
        res.status(200).json({ message: '✅ Post supprimé avec succès !' });
    });
};

// récupération d’un seul post
exports.getOnePost = (req, res) => {
    const postId = req.params.id;
    db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result[0]);
    });
};

// récupération de tous les posts
exports.getAllPosts = (req, res) => {
    db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

// récupération de tous les posts d’un utilisateur
exports.getAllPostsByUser = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

// récupération des posts par date décroissante
exports.getPostsByDate = (req, res) => {
    db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};
