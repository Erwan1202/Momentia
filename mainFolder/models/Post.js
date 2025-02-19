const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Post = db.define('Post', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    caption: { type: DataTypes.TEXT, allowNull: true },
    image_url: { type: DataTypes.TEXT, allowNull: false },
    location: { type: DataTypes.STRING(100), allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'posts'
});

// Relation : Un Post appartient à un User
Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Post;
