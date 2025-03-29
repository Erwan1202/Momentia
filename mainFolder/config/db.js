require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10, // Nombre max de connexions simultanées
    queueLimit: 0
});

// Vérifier la connexion
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erreur de connexion MySQL :', err);
    } else {
        console.log('✅ Connecté à la base de données MySQL !');
        connection.release();
    }
});

module.exports = pool;
