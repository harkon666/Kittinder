import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { otherUser } from "../_actions/user";
import { getSpecies } from "../_actions/species";
import { getAges } from "../_actions/age";
import { getPets } from "../_actions/pet";

const Data = props => {
  useEffect(() => {
    props.getPets();
  }, []);
  console.log(props.pet, "galaksss");
  let a = [];
  if (props.pet.allPet.length > 0) {
    for (let i = 0; i < props.pet.allPet.length; i++) {
      let temp = {};
      for (let j = 0; j < props.pet.allPet.length; j++) {
        console.log(props.pet.allPet[i].pet.id, "galaks");
        if (props.pet.allPet[i].pet.id == i + 1) {
          if (temp !== props.pet.allPet[i]) {
            console.log("galaks beut");
            temp = props.pet.allPet[i];
            a.push(props.pet.allPet[i]);
          }
        }
      }
    }
    console.log(a, "galaks");
  }
  return <>{a}</>;
};

const mapStateToProps = state => {
  return {
    otherUser: state.user,
    age: state.age,
    species: state.species,
    pet: state.pet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    otherUser: () => dispatch(otherUser()),
    getAges: () => dispatch(getAges()),
    getSpecies: () => dispatch(getSpecies()),
    getPets: () => dispatch(getPets())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
