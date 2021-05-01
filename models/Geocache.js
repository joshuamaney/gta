const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Geocache extends Model {}

Geocache.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hint: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_found_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'geocache',
  }
);

module.exports = Geocache;
