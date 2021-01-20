'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usersLists.init({
    userId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersLists',
  });
  return usersLists;
};