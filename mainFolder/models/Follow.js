const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');
require('dotenv').config();

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    port: DB_PORT,
});
class Follow{
    static async getAllFollow(){
        const result = await db.query('SELECT * FROM follows');
        return result.rows;
    }

    static async getFollowById(id){
        const result = await db.query('SELECT * FROM follows WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async createFollow(data){
        const result = await db.query('INSERT INTO follows (user_id, follower_id) VALUES ($1, $2) RETURNING *', [data.user_id, data.follower_id]);
        return result.rows[0];
    }

    static async deleteFollow(id){
        const result = await db.query('DELETE FROM follows WHERE id = $1', [id]);
        return result;
    }

    static async getFollowByUser(id){
        const result = await db.query('SELECT * FROM follows WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getFollowByFollower(id){
        const result = await db.query('SELECT * FROM follows WHERE follower_id = $1', [id]);
        return result.rows;
    }

    static async getFollowByUserEmail(email){
        const user = await User.getUserByEmail(email);
        const result = await db.query('SELECT * FROM follows WHERE user_id = $1', [user.id]);
        return result.rows;
    }

    static async getFollowByFollowerEmail(email){
        const user = await User.getUserByEmail(email);
        const result = await db.query('SELECT * FROM follows WHERE follower_id = $1', [user.id]);
        return result.rows;
    }
    
    static async getFollowByUserAndFollower(user_id, follower_id){
        const result = await db.query('SELECT * FROM follows WHERE user_id = $1 AND follower_id = $2', [user_id, follower_id]);
        return result.rows;
    }



}

module.exports = Follow;
