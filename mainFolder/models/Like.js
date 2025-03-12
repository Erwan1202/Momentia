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
    static async getAllLike(){
        const result = await db.query('SELECT * FROM likes');
        return result.rows;
    }

    static async getLikeById(id){
        const result = await db.query('SELECT * FROM likes WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async createLike(data){
        const result = await db.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *', [data.user_id, data.post_id]);
        return result.rows[0];
    }

    static async deleteLike(id){
        const result = await db.query('DELETE FROM likes WHERE id = $1', [id]);
        return result;
    }

    static async getLikeByUser(id){
        const result = await db.query('SELECT * FROM likes WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getLikeByPost(id){
        const result = await db.query('SELECT * FROM likes WHERE post_id = $1', [id]);
        return result.rows;
    }

    static async getLikeByComment(id){ 
        const result = await db.query('SELECT * FROM likes WHERE comment_id = $1', [id]);
        return result.rows;
    }

    
}

module.exports = Like;

