"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      breeder: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeCreate: (user, option) => {
          return bcrypt.hash(user.password, 10).then(hashed => {
            user.password = hashed;
          });
        }
      }
    }
  );
  user.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
