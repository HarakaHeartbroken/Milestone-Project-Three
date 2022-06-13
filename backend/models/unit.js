'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Unit extends Model {


    static associate({ Comment }) {
      Unit.hasMany(Comment, { foreignKey: 'unit_id', as: 'comments' })
    }

  };

  Unit.init({
    unitId: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Lorem Ipsum'
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Legionary'
    },
    legion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Second Legion'
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Infantry'
    },
    pic: DataTypes.STRING,
    recruited: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Unit',
  });
  return Unit;
};