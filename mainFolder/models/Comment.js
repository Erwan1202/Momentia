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


class Comment{
    
    static async getAllComment(){
        const result = await db.query('SELECT * FROM comments');
        return result.rows;
    }

    static async getCommentById(id){
        const result = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async createComment(data){
        const result = await db.query('INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *', [data.content, data.user_id, data.post_id]);
        return result.rows[0];
    }

    static async updateComment(id, data){
        const result = await db.query('UPDATE comments SET content = $1 WHERE id = $2 RETURNING *', [data.content, id]);
        return result.rows[0];
    }

    static async deleteComment(id){
        const result = await db.query('DELETE FROM comments WHERE id = $1', [id]);
        return result;
    }

    static async getCommentByUser(id){
        const result = await db.query('SELECT * FROM comments WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getCommentByPost(id){
        const result = await db.query('SELECT * FROM comments WHERE post_id = $1', [id]);
        return result.rows;
    }

}

module.exports = Comment;

