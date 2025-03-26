const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

//creation utilisateur
router.post('/register', userController.createUser);

//connexion
router.post('/login', userController.login);

//deconnexion
router.post('/logout', userController.logout);

//récupérer un utilisateur
router.get('/:id', userController.getUser);

//mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

//récupérer tous les utilisateurs
router.get('/', userController.getAllUser);

//supprimer un utilisateur
router.delete('/:id', userController.deleteUser);



module.exports = router;
