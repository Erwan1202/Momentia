const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// créer un utilisateur
export const createUser = (req, res) => {
    try{
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User.createUser({username, email, password: hashedPassword});
        res.status(201).json(user);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}   

// se connecter
export const login = (req, res) => {
    try{
        const { email, password } = req.body;
        const user = User.getUserByEmail(email);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        if(bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return res.status(200).json({token});
        }else{
            return res.status(401).json({message: 'Invalid credentials'});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// se deconnecter
export const logout = (req, res) => {
    try{
        res.status(200).json({token: ''});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// récupérer un utilisateur
export const getUser = (req, res) => {
    try{
        const user = User.getUserById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// mettre à jour un utilisateur
export const updateUser = (req, res) => {
    try{
        const user = User.updateUser(req.params.id, req.body);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// récupérer tous les utilisateurs
export const getAllUser = (req, res) => {
    try{
        const users = User.getAllUser();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// supprimer un utilisateur
export const deleteUser = (req, res) => {
    try{
        const user = User.deleteUser(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(204).json();
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

