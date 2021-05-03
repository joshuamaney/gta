const sequelize = require('../config/connection');
const { User, Geocache } = require('../models');

const userData = require('./userData.json');
const geocacheData = require('./geocacheData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Geocache.bulkCreate(geocacheData);

  process.exit(0);
};

seedDatabase();
