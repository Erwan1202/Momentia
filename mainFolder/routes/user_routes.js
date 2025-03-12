const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/authMiddleware'); // Pour protéger certaines routes

//creation utilisateur
router.post('/register', userController.createUser);

//connexion
router.post('/login', userController.login);

//deconnexion
router.post('/logout', userController.logout);

//récupérer un utilisateur
router.get('/:id', authMiddleware, userController.getUser);

//mettre à jour un utilisateur
router.put('/:id', authMiddleware, userController.updateUser);

//récupérer tous les utilisateurs
router.get('/', authMiddleware, userController.getAllUser);

//supprimer un utilisateur
router.delete('/:id', authMiddleware, userController.deleteUser);



module.exports = router;
