"use strict";
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define(
    "photo",
    {
      url: DataTypes.STRING,
      id_pet: DataTypes.INTEGER
    },
    {}
  );
  photo.associate = function(models) {
    // associations can be defined here
    photo.belongsTo(models.pet, {
      foreignKey: "id_pet"
    });
  };
  return photo;
};
