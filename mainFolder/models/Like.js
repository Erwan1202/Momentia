const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');
const Post = require('./Post');

const Like = db.define('Like', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    post_id: { type: DataTypes.BIGINT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'likes'
});

// Relations
Like.belongsTo(User, { foreignKey: 'user_id' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = Like;

