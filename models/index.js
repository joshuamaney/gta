const User = require('./User');
const GeocacheData = require('./GeocacheData');

User.hasMany(GeocacheData, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

GeocacheData.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, GeocacheData };
