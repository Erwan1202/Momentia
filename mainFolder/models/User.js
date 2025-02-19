const { DataTypes } = require('sequelize');
const db = require('../config/db');

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



}

module.exports = User;
