const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');
const Post = require('./Post');
require('dotenv').config();

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    port: DB_PORT,
});

class Like{
    static async getAllDislike(){
        const result = await db.query('SELECT * FROM dislikes');
        return result.rows;
    }

    static async getDislikeById(id){
        const result = await db.query('SELECT * FROM dislikes WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async createDislike(data){
        const result = await db.query('INSERT INTO dislikes (user_id, post_id) VALUES ($1, $2) RETURNING *', [data.user_id, data.post_id]);
        return result.rows[0];
    }

    static async deleteDislike(id){
        const result = await db.query('DELETE FROM dislikes WHERE id = $1', [id]);
        return result;
    }

    static async getDislikeByUser(id){
        const result = await db.query('SELECT * FROM dislikes WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getDislikeByPost(id){
        const result = await db.query('SELECT * FROM dislikes WHERE post_id = $1', [id]);
        return result.rows;
    }
    
    static async getDislikeByComment(id){ 
        const result = await db.query('SELECT * FROM dislikes WHERE comment_id = $1', [id]);
        return result.rows;
    }
}

module.exports = Dislike;

