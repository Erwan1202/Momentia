const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Follow = db.define('Follow', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    follower_id: { type: DataTypes.BIGINT, allowNull: false },
    following_id: { type: DataTypes.BIGINT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'follows'
});

// Relations
Follow.belongsTo(User, { foreignKey: 'follower_id', as: 'Follower' });
Follow.belongsTo(User, { foreignKey: 'following_id', as: 'Following' });

module.exports = Follow;
