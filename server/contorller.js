const models = require("./models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = models.user;
const Pet = models.pet;
const Age = models.age;
const Species = models.species;
const Photo = models.photo;
const Match = models.match;
const Payment = models.payment;

exports.findUsers = async (req, res) => {
  try {
    const user = await User.findAll({});
    res.send({ data: user });
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ raw: true, where: { email } });
    const valid = await bcrypt
      .compare(password, user.password)
      .then(res => res);
    console.log(valid);
    if (user.email === email) {
      if (valid) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
        res.send({ message: "success", email, token });
      } else {
        res.status(401).send({ message: "wrong password" });
      }
    } else {
      res.status(401).send({ message: "wrong email" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "wrong email" });
  }
};

exports.register = async (req, res) => {
  try {
    const {
      breeder,
      email,
      password,
      phone,
      address,
      name,
      gender,
      species_id,
      age_id,
      is_admin = false
    } = req.body;

    await User.create({
      breeder,
      email,
      password,
      phone,
      address,
      is_admin
    });

    const findNewUser = await User.findOne({ raw: true, where: { email } });

    const create = await Pet.create({
      name,
      gender,
      species_id,
      age_id,
      user_id: findNewUser.id
    });

    await Photo.create({
      url: "default",
      id_pet: create.id
    });

    const show = await User.findAll({
      where: { email },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "is_admin"]
      }
    });
    const token = jwt.sign({ user_id: findNewUser.id }, process.env.SECRET_KEY);
    res.send({ message: "success", token, show });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "error" });
  }
};

exports.insertSpecies = async (req, res) => {
  try {
    const { name } = req.body;
    await Species.create({ name });

    const show = await Species.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
    res.send({ message: "success", show });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "error" });
  }
};

exports.getSpecies = async (req, res) => {
  try {
    const show = await Species.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
    res.send({ data: show });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "error" });
  }
};

exports.addPet = async (req, res) => {
  try {
    const {
      name,
      gender,
      species: { id },
      age_id,
      about_pet,
      photo
    } = req.body;

    const pet = await Pet.create({
      name,
      gender,
      species_id: id,
      age_id,
      user_id: req.user,
      about: about_pet
    });

    const show = await Pet.findOne({
      raw: true,
      where: { id: pet.dataValues.id }
    });

    await Photo.create({ url: photo, id_pet: show.id });

    res.send({ message: "success", show });
  } catch (err) {
    console.log(err);
  }
};

exports.getPet = async (req, res) => {
  try {
    const show = await Pet.findAll({
      // where: { user_id: req.user },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "email", "password", "is_admin"]
          }
        },
        {
          model: Species,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        {
          model: Age,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
          }
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "species_id", "age_id"]
      }
    });
    const pics = await Photo.findAll({
      include: [
        { model: Pet, attributes: { exclude: ["createdAt", "updatedAt"] } }
      ]
    });
    res.send({ message: "success", data: pics });
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.findUser = async (req, res) => {
  try {
    const id = req.params.id;
    const show = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["email", "password", "is_admin", "createdAt", "updatedAt"]
      }
    });
    res.send({ message: "success", show });
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const { name, gender, age_id, about, photo } = req.body;

    const update = await Pet.update(
      {
        name,
        gender,
        age_id,
        about
      },
      { where: { user_id: req.user, id: req.params.id } }
    );
    if (update.length > 0 && update[0]) {
      // await Photo.update({ url: photo }, { where: { id_pet: req.params.id } });
      const show = await Pet.findOne({
        raw: true,
        where: { id: req.params.id },
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "email",
                "password",
                "is_admin"
              ]
            }
          },
          {
            model: Species,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          },
          {
            model: Age,
            attributes: {
              exclude: ["createdAt", "updatedAt", "id"]
            }
          }
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "species_id", "age_id"]
        }
      });
      res.send({ message: "success", data: show });
    } else {
      res.status(401).send({ message: "data not match" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const destroy = await Pet.destroy({ where: { id } });
    console.log(destroy);
    if (destroy === 1) {
      res.send({ message: "success", id });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    console.log(req.user, req.params.id);
    if (req.user == req.params.id) {
      await User.update(
        { breeder: name, address, phone },
        {
          where: { id: req.params.id }
        }
      );
      const show = await User.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["email", "password", "is_admin", "createdAt", "updatedAt"]
        }
      });
      res.send({ message: "success", show });
    } else {
      res.status(403).send({ message: "cant edit someone else, you is you" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.body.params;

    await User.destroy({ where: { id } });
    res.send({ message: "success", id });
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.checkMatch = async (req, res) => {
  try {
    const pet_id = req.query.pet_id;
    const pet_liked = req.query.pet_id_liked;
    const show = await Match.findAll({
      // where: {
      //   [Op.or]: [
      //     {
      //       pet_id,
      //       pet_liked_id: pet_liked
      //     },
      //     {
      //       pet_id: pet_liked,
      //       pet_liked_id: pet_id
      //     }
      //   ]
      // },
      include: [
        {
          model: Pet,
          as: "pet1",
          attributes: {
            exclude: ["createdAt", "updateAt"]
          },
          include: {
            model: Species,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: Age,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: User,
            attributes: {
              exclude: [
                "email",
                "password",
                "is_admin",
                "createdAt",
                "updateAt"
              ]
            }
          }
        },
        {
          model: Pet,
          as: "pet2",
          attributes: {
            exclude: ["createdAt", "updateAt"]
          },
          include: {
            model: Species,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: Age,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: User,
            attributes: {
              exclude: [
                "email",
                "password",
                "is_admin",
                "createdAt",
                "updateAt"
              ]
            }
          }
        }
      ]
    });
    if (show.length > 0) {
      res.send({ message: "success", data: show });
    } else {
      res.send("No match");
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const { pet_id, pet_id_liked, status } = req.body;

    const shows = await Match.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            pet_id,
            pet_liked_id: pet_id_liked
          },
          {
            pet_id: pet_id_liked,
            pet_liked_id: pet_id
          }
        ]
      }
    });
    console.log(shows);
    const valid = await Pet.findAll({
      raw: true,
      where: {
        [Op.or]: [{ id: pet_id }, { id: pet_id_liked }]
      }
    });

    if (valid[0].user_id != valid[1].user_id) {
      if (shows.length === 0) {
        await Match.create({
          status,
          pet_id,
          pet_liked_id: pet_id_liked
        });
        const show = await Match.findOne({
          where: { pet_id, pet_liked_id: pet_id_liked },
          include: [
            {
              model: Pet,
              as: "pet1",
              attributes: {
                exclude: ["createdAt", "updateAt"]
              },
              include: {
                model: Species,
                attributes: {
                  exclude: ["createdAt", "updateAt"]
                }
              },
              include: {
                model: Age,
                attributes: {
                  exclude: ["createdAt", "updateAt"]
                }
              },
              include: {
                model: User,
                attributes: {
                  exclude: [
                    "email",
                    "password",
                    "is_admin",
                    "createdAt",
                    "updateAt"
                  ]
                }
              }
            },
            {
              model: Pet,
              as: "pet2",
              attributes: {
                exclude: ["createdAt", "updateAt"]
              },
              include: {
                model: Species,
                attributes: {
                  exclude: ["createdAt", "updateAt"]
                }
              },
              include: {
                model: Age,
                attributes: {
                  exclude: ["createdAt", "updateAt"]
                }
              },
              include: {
                model: User,
                attributes: {
                  exclude: [
                    "email",
                    "password",
                    "is_admin",
                    "createdAt",
                    "updateAt"
                  ]
                }
              }
            }
          ]
        });
        res.send({ data: { message: "success", show } });
      } else {
        res.send({ data: { message: "you did like it" } });
      }
    } else if (valid[0].user_id != req.user) {
      res.status(401).send({ data: { message: "this is not your pet" } });
    } else {
      res
        .status(401)
        .send({ data: { message: "must matching with other user's pets" } });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "error, you must matching with other user's pets" });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const { pet_id, pet_id_liked, status } = req.body;
    const update = await Match.update(
      { status },
      {
        where: {
          pet_liked_id: pet_id,
          status: false
        }
      }
    );
    if (update.length > 0 && update[0]) {
      const show = await Match.findOne({
        where: { pet_id, pet_liked_id: pet_id_liked },
        include: [
          {
            model: Pet,
            as: "pet1",
            attributes: {
              exclude: ["createdAt", "updateAt"]
            },
            include: {
              model: Species,
              attributes: {
                exclude: ["createdAt", "updateAt"]
              }
            },
            include: {
              model: Age,
              attributes: {
                exclude: ["createdAt", "updateAt"]
              }
            },
            include: {
              model: User,
              attributes: {
                exclude: [
                  "email",
                  "password",
                  "is_admin",
                  "createdAt",
                  "updateAt"
                ]
              }
            }
          },
          {
            model: Pet,
            as: "pet2",
            attributes: {
              exclude: ["createdAt", "updateAt"]
            },
            include: {
              model: Species,
              attributes: {
                exclude: ["createdAt", "updateAt"]
              }
            },
            include: {
              model: Age,
              attributes: {
                exclude: ["createdAt", "updateAt"]
              }
            },
            include: {
              model: User,
              attributes: {
                exclude: [
                  "email",
                  "password",
                  "is_admin",
                  "createdAt",
                  "updateAt"
                ]
              }
            }
          }
        ]
      });
      res.send({ data: { message: "success", show } });
    } else {
      res.send({ data: { message: "You liked first" } });
    }
  } catch (error) {
    console.log(err);
    res.status(401).send({ message: "No Match" });
  }
};

exports.matches = async (req, res) => {
  try {
    const pet_id = req.query.pet_id;

    const show = await Match.findAll({
      where: {
        [Op.or]: [
          { pet_id, status: true },
          { pet_liked_id: pet_id, status: true }
        ]
      },
      include: [
        {
          model: Pet,
          as: "pet1",
          attributes: {
            exclude: ["createdAt", "updateAt"]
          },
          include: {
            model: Species,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: Age,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: User,
            attributes: {
              exclude: [
                "email",
                "password",
                "is_admin",
                "createdAt",
                "updateAt"
              ]
            }
          }
        },
        {
          model: Pet,
          as: "pet2",
          attributes: {
            exclude: ["createdAt", "updateAt"]
          },
          include: {
            model: Species,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: Age,
            attributes: {
              exclude: ["createdAt", "updateAt"]
            }
          },
          include: {
            model: User,
            attributes: {
              exclude: [
                "email",
                "password",
                "is_admin",
                "createdAt",
                "updateAt"
              ]
            }
          }
        }
      ]
    });
    res.send({ data: { message: "success", show } });
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.payment = async (req, res) => {
  try {
    const { no_rek, proof_of_transfer, status } = req.body;
    await Payment.create({
      no_rek,
      proof_of_transfer,
      user_id: req.user,
      status
    });
    const show = await Payment.findOne({
      where: { user_id: req.user },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["email", "password", "is_admin"]
          }
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"]
      }
    });
    res.send({ message: "success", show });
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.validPayment = async (req, res) => {
  try {
    const { no_rek, status } = req.body;
    const user = await User.findOne({ raw: true, where: { id: req.user } });
    console.log(user.is_admin);
    if (user.is_admin) {
      await Payment.update({ status }, { where: { no_rek } });
      const show = await Payment.findOne({
        where: { status, no_rek },
        include: [
          {
            model: User,
            exclude: ["email", "password", "is_admin"]
          }
        ]
      });
      res.send({ message: "success", show });
    } else {
      res.send({ message: "you are not admin" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "error" });
  }
};

exports.findPayment = async (req, res) => {
  try {
    const user = await User.findOne({ raw: true, where: { id: req.user } });
    console.log(user.is_admin);
    if (user.is_admin) {
      const show = await Payment.findAll({
        where: { status: "free" }
      });
      res.send({ message: "success", show });
    } else {
      res.send({ message: "you are not admin" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.ages = async (req, res) => {
  try {
    const ages = await Age.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
    res.send({ message: "success", data: ages });
  } catch (err) {
    console.log(err);
  }
};

exports.thisUser = async (req, res) => {
  try {
    const data = await User.findOne({ where: { id: req.user } });
    res.send({ message: "success", data });
  } catch (err) {
    console.log(err);
  }
};

exports.thisPet = async (req, res) => {
  try {
    const data = await Pet.findAll({ where: { user_id: req.user } });
    res.send({ message: "success", data });
  } catch (err) {
    console.log(err);
  }
};
