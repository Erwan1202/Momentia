const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');
const Post = require('./Post');

const Comment = db.define('Comment', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    post_id: { type: DataTypes.BIGINT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'comments'
});

// Relations
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = Comment;

