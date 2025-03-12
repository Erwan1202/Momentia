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

    static async getCommentByPostAndUser(post_id, user_id){
        const result = await db.query('SELECT * FROM comments WHERE post_id = $1 AND user_id = $2', [post_id, user_id]);
        return result.rows;
    }

    static async LikeComment(id){
        const result = await db.query('UPDATE comments SET likes = likes + 1 WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    static async DislikeComment(id){
        const result = await db.query('UPDATE comments SET likes = likes - 1 WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    static async getCommentByLikes(){
        const result = await db.query('SELECT * FROM comments ORDER BY likes DESC');
        return result.rows;
    }

    static async getCommentByDate(){
        const result = await db.query('SELECT * FROM comments ORDER BY created_at DESC');
        return result.rows;
    }

    static async getCommentByPostAndDate(post_id){
        const result = await db.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC', [post_id]);
        return result.rows;
    }


    
}   

module.exports = Comment;

