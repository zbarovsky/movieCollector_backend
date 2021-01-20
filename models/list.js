'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  list.init({
    title: DataTypes.STRING,
    movie: DataTypes.STRING,
    movieId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'list',
  });
  return list;
};