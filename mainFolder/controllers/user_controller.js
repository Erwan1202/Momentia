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

// Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email, bio, profile_picture } = req.body;

    const query = 'UPDATE users SET username = ?, email = ?, bio = ?, profile_picture = ? WHERE id = ?';
    db.query(query, [username, email, bio, profile_picture, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
};


// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Utilisateur supprimé avec succès' });
    });
};

// Patch un utilisateur
exports.patchUser = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const key = Object.keys(data);
    const setClause = key.map((item, index) => {
        return `${item} = ?`;
    }).join(', ');
    const values = Object.values(data);
    const query = {
        text: `UPDATE users SET ${setClause} WHERE id = ?`,
        values: [...values, id]
    }
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
};

// Récupérer les posts d'un utilisateur
exports.getUserPost = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM posts WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// Récupérer les commentaires d'un utilisateur
exports.getUserComment = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM comments WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// Récupérer les likes d'un utilisateur
exports.getUserLike = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM likes WHERE user_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

// Récupérer les utilisateurs suivis par un utilisateur
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

// Récupérer les followers d'un utilisateur
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
