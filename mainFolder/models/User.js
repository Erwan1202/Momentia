const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password_hash: { type: DataTypes.TEXT, allowNull: false },
    avatar_url: { type: DataTypes.TEXT, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'users'
});

module.exports = User;
