const { DataTypes } = require('sequelize');
const db = require('../config/db');
require('dotenv').config();

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    port: DB_PORT,
});


class User{
    static async getAllUser(){7
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    }

    static async getUserById(id){
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async getUserByEmail(email){
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    static async createUser(data){
        const result = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [data.name, data.email, data.password]);
        return result.rows[0];
    }

    static async updateUser(id, data){
        const result = await db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [data.name, data.email, data.password, id]);
        return result.rows[0];
    }

    static async deleteUser(id){
        const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
        return result;
    }

    static async patchUser(id, data){
        const key = Object.keys(data);
        const setClause = key.map((item, index) => {
            return `${item} = $${index + 1}`;
        }
        ).join(', ');
        const values = Object.values(data);
        const query = {
            text: `UPDATE users SET ${setClause} WHERE id = $${key.length + 1} RETURNING *`,
            values: [...values, id]
        }
        const result = await db.query(query);
        return result.rows[0];
    }

    static async getUserPost(id){
        const result = await db.query('SELECT * FROM posts WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getUserComment(id){
        const result = await db.query('SELECT * FROM comments WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getUserLike(id){
        const result = await db.query('SELECT * FROM likes WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getUserFollow(id){
        const result = await db.query('SELECT * FROM follows WHERE user_id = $1', [id]);
        return result.rows;
    }

    static async getUserFollower(id){
        const result = await db.query('SELECT * FROM follows WHERE follower_id = $1', [id]);
        return result.rows;
    }

    static async getUserByPost(id){
        const result = await db.query('SELECT * FROM users WHERE id = (SELECT user_id FROM posts WHERE id = $1)', [id]);
        return result.rows[0];
    }

    static async getUserByComment(id){
        const result = await db.query('SELECT * FROM users WHERE id = (SELECT user_id FROM comments WHERE id = $1)', [id]);
        return result.rows[0];
    }


    static async getUserByLike(id){
        const result = await db.query('SELECT * FROM users WHERE id = (SELECT user_id FROM likes WHERE id = $1)', [id]);
        return result.rows[0];
    }

    static async getUserByFollow(id){
        const result = await db.query('SELECT * FROM users WHERE id = (SELECT user_id FROM follows WHERE id = $1)', [id]);
        return result.rows[0];
    }

    static async getUserByFollower(id){
        const result = await db.query('SELECT * FROM users WHERE id = (SELECT follower_id FROM follows WHERE id = $1)', [id]);
        return result.rows[0];
    }

    static async getUserByFollowEmail(email){
        const user = await User.getUserByEmail(email);
        const result = await db.query('SELECT * FROM users WHERE id = (SELECT user_id FROM follows WHERE user_id = $1)', [user.id]);
        return result.rows;
    }

    static async getUserByFollowerEmail(email){
        const user = await User.getUserByEmail(email);
        const result = await db.query('SELECT * FROM users WHERE id = (SELECT follower_id FROM follows WHERE follower_id = $1)', [user.id]);
        return result.rows;
    }

    static async getUserByDate(created_at){
        const result = await db.query('SELECT * FROM users ORDER BY created_at DESC');
        return result.rows;
    }



}

module.exports = User;
