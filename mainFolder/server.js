const express = require('express');
const cors = require('cors');

const db = require('./config/db');  // Import de la connexion DB

const app = express();
const PORT = 3000;
app.use(cors());

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

app.get('/api/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, result) => {
        if (err) {
            console.error("❌ Erreur SQL :", err); // ✅ Ajoute ce log
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Posts récupérés :", result); // ✅ Voir le contenu récupéré
        res.json(result);
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
