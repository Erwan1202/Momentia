const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

class Post{
    static async getAllPost(){
        const result = await db.query('SELECT * FROM posts');
        return result.rows;
    }

    static async getPostById(id){
        const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async createPost(data){
        const result = await db.query('INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [data.title, data.content, data.user_id]);
        return result.rows[0];
    }

    static async updatePost(id, data){
        const result = await db.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *', [data.title, data.content, id]);
        return result.rows[0];
    }

    static async deletePost(id){
        const result = await db.query('DELETE FROM posts WHERE id = $1', [id]);
        return result;
    }

    static async patchPost(id, data){
        const key = Object.keys(data);
        const setClause = key.map((item, index) => {
            return `${item} = $${index + 1}`;
        }
        ).join(', ');
        const values = Object.values(data);
        const query = {
            text: `UPDATE posts SET ${setClause} WHERE id = $${key.length + 1} RETURNING *`,
            values: [...values, id]
        }
        const result = await db.query(query);
        return result.rows[0];
    }

    static async getPostByUser(id){
        const result = await db.query('SELECT * FROM posts WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getPostByUserEmail(email){
        const user = await User.getUserByEmail(email);
        const result = await db.query('SELECT * FROM posts WHERE user_id = $1', [user.id]);
        return result.rows;
    }

}

module.exports = Post;
