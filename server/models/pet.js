"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      species_id: DataTypes.INTEGER,
      age_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      about: DataTypes.TEXT
    },
    {}
  );
  pet.associate = function(models) {
    // associations can be defined here
    pet.belongsTo(models.user, {
      foreignKey: "user_id"
    }),
      pet.belongsTo(models.age, {
        foreignKey: "age_id"
      }),
      pet.belongsTo(models.species, {
        foreignKey: "species_id"
      });
  };
  return pet;
};
