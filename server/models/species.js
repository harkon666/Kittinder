"use strict";
module.exports = (sequelize, DataTypes) => {
  const species = sequelize.define(
    "species",
    {
      name: DataTypes.STRING
    },
    {}
  );
  species.associate = function(models) {
    // associations can be defined here
    species.hasOne(models.pet, {
      foreignKey: "species_id"
    });
  };
  return species;
};
