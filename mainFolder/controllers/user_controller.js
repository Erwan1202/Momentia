const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription
exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(query, [username, email, passwordHash], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
    });
};

// Connexion
exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const user = result[0];
        const isValidPassword = bcrypt.compareSync(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

        res.json({ message: 'Connexion réussie', token });
    });
};

// Récupérer un utilisateur
exports.getUser = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, username, email, bio, profile_picture FROM users WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(result[0]);
    });
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
    const query = 'SELECT id, username, email FROM users';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};
