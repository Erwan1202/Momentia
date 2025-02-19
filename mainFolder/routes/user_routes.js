const express = require('express');
const userController = require('../controllers/user_controller');

const router = express.Router();

// Route pour l'inscription
router.post('/register', userController.register);

// Route pour la connexion
router.post('/login', userController.login);

// Route pour récupérer un utilisateur par ID
router.get('/:id', userController.getUser);

// Route pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

module.exports = router;
