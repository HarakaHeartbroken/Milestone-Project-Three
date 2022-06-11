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
    name: DataTypes.STRING,
    rank: DataTypes.STRING,
    legion: DataTypes.STRING,
    keywords: DataTypes.STRING,
    pic: DataTypes.STRING,
    recruited: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Unit',
  });
  return Unit;
};