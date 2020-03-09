"use strict";
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define(
    "match",
    {
      status: DataTypes.BOOLEAN,
      pet_id: DataTypes.INTEGER,
      pet_liked_id: DataTypes.INTEGER
    },
    {}
  );
  match.associate = function(models) {
    // associations can be defined here
    match.belongsTo(models.pet, {
      foreignKey: "pet_id",
      as: "pet1"
    });

    match.belongsTo(models.pet, {
      foreignKey: "pet_liked_id",
      as: "pet2"
    });
  };
  return match;
};
