'use strict';
const bcrypt = require('bcrypt');
//const {delete}  = require('../routes/auth');

module.exports = function(sequelize, DataTypes) {
 const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1,99],
          // msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
        unique: true,
        isEmail: {
          msg: 'Invalid email address'
        }
      
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [1,99],
          // msg: 'Username must be between 1 and 99 characters and unique'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      // validate: {
      //is: ["^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"],
      //   // msg: ['Password must be at least 8 characters, and have one number and one special character']
      // }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        //msg: 'Please enter a number'
      }
    }
  }, {
      // BCRYPT HOOK FOR HASH AND SALT PASSWORD
    hooks: {
      beforeCreate: function(createdUser, options) {
        if (createdUser && createdUser.password) {
          let hash = bcrypt.hash(createdUser.password, 12);
          createdUser.password = hash
        }
      }
    }
  })

  user.associate = function(models) {
    models.user.hasMany(models.list)
  }

  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password)
  }

  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData
  }

  return user;
};