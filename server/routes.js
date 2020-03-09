"use strict";
const todoList = require("./contorller");
const { auth } = require("./middleware");

module.exports = function(app) {
  app.get("/api/v1/a", todoList.findUsers);

  app.get("/api/v1/user/:id", todoList.findUser);

  app.get("/api/v1/species", todoList.getSpecies);

  app.post("/api/v1/login", todoList.login);

  app.post("/api/v1/register", todoList.register);

  app.post("/api/v1/add_species", auth, todoList.insertSpecies);

  app.post("/api/v1/pet", auth, todoList.addPet);

  app.get("/api/v1/pets", auth, todoList.getPet);

  app.put("/api/v1/pet/:id", auth, todoList.updatePet);

  app.delete("/api/v1/pet/:id", auth, todoList.deletePet);

  app.put("/api/v1/user/:id", auth, todoList.updateUser);

  app.delete("/api/v1/user/:id", auth, todoList.deleteUser);

  app.get("/api/v1/match", auth, todoList.checkMatch);

  app.post("/api/v1/match", auth, todoList.createMatch);

  app.put("/api/v1/match", auth, todoList.updateMatch);

  app.get("/api/v1/matches", auth, todoList.matches);

  app.post("/api/v1/payment", auth, todoList.payment);

  app.put("/api/v1/payment/:id", auth, todoList.validPayment);

  app.get("/api/v1/ages", todoList.ages);

  app.get("/api/v1/this_user", auth, todoList.thisUser);

  app.get("/api/v1/this_pet", auth, todoList.thisPet);
};
