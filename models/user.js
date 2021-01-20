'use strict';
const bcrypt = require(bcrypt);

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // TODO: WRITE ASSOCIATIONS 1-M (one user has many lists)
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        unique: true,
        isEmail: {
          msg: 'Invalid email address'
        }
      }
      
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        unique: true,
        len: {
          args: [1,99],
          msg: 'Username must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: ["^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"],
        msg: 'Password must be at least 8 characters, and have one number and one special character'
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        msg: 'Please enter a number'
      }
    }
  },
  //  TODO: WRITE BCRYPT HOOK FOR HASH AND SALT PASSWORD

  {
    sequelize,
    modelName: 'user',
  });
  return user;
};