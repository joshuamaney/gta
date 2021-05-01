const User = require('./User');
const Geocache = require('./Geocache');

User.hasMany(Geocache, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Geocache.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Geocache };
