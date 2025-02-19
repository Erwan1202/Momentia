const express = require('express');
const cors = require('cors');
const db = require('./config/db');  // Import de la connexion DB

// Import des routes
const userRoutes = require('./routes/user_routes');
const postRoutes = require('./routes/post_routes');
const commentRoutes = require('./routes/comment_routes');
const likeRoutes = require('./routes/like_routes');
const followRoutes = require('./routes/follow_routes');

const app = express();
const PORT = 3667;

app.use(cors());
app.use(express.json());  // Pour analyser le corps des requêtes en JSON

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);

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
