const express = require('express');
const db = require('./config/db');  // Import de la connexion DB

const app = express();
const PORT = 3000;

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Momentia 🚀');
});

// Route test de la base de données
app.get('/db-test', (req, res) => {
    db.query('SELECT NOW()', (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Connexion à la DB réussie', time: result[0] });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
