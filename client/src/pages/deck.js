import React, { useState, useEffect } from "react";
import "./deck.css";
import TinderCard from "./react-tinder-card/index";
import { thisPet } from "../_actions/pet";
import { getPets } from "../_actions/pet";
import { match, updateMatch } from "../_actions/match";
import { connect } from "react-redux";
import pic from "./cat.jpg";

function Deck(props) {
  const [lastDirection, setLastDirection] = useState();
  const [like, setLike] = useState();
  const [flag, setFlag] = useState(0);
  const [flag2, setFlag2] = useState(0);

  console.log(like, lastDirection, "galaks anying");

  const postMatch = async () => {
    if (lastDirection == "right") {
      const id = props.pet.data[0].id;
      const status = false;
      return await props.match(id, like, status);
    } else {
      return;
    }
  };

  const updateMatch = async () => {
    if (lastDirection == "right") {
      const id = props.pet.data[0].id;
      const status = true;
      return await props.updateMatch(id, like, status);
    }
  };

  useEffect(() => {
    props.getPets();
  }, []);

  const characters = props.pet.allPet;

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = name => {
    console.log(name + " left the screen!");
  };

  if (props.pet.data.length > 0 && like) {
    if (lastDirection) {
      if (lastDirection === "right" && flag === 0) {
        console.log(true, "galaks bgt");
        postMatch();
        setFlag(1);
        setFlag2(1);
      }
    }
  }

  if (props.matching.data && like) {
    if (lastDirection) {
      if (lastDirection === "right" && flag === 1 && flag2 === 1) {
        updateMatch();
        setFlag(2);
        setFlag2(0);
      }
    }
  }

  if (props.matching.data) {
  }

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <div className="cardContainer">
        {characters.map(character => {
          if (props.pet.data.length > 0) {
            if (props.pet.data[0].id === character.pet.id) {
              return;
            } else {
              return (
                <TinderCard
                  className="swipe"
                  key={character.pet.id}
                  onSwipe={dir => {
                    swiped(dir, character.pet.name);
                  }}
                  onCardLeftScreen={() => {
                    outOfFrame(character.pet.name);
                    setLike(character.pet.id);
                    setFlag(0);
                  }}
                >
                  <div
                    style={{ backgroundImage: "url(" + pic + ")" }}
                    className="card-deck"
                  >
                    <h3>{character.pet.name}</h3>
                  </div>
                </TinderCard>
              );
            }
          } else {
            return <h1>Loading...</h1>;
          }
        })}
      </div>
      {lastDirection ? (
        <>
          <h2 className="infoText text-primary">You swiped {lastDirection}</h2>
          {lastDirection === "right" ? (
            <>
              {props.matching.matches.message ? (
                <h2 className="infoText text-primary">
                  {props.matching.matches.message}
                </h2>
              ) : (
                <h2 className="infoText text-primary">
                  {props.matching.data.message}
                </h2>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    pet: state.pet,
    matching: state.match
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPets: () => dispatch(getPets()),
    match: (id, pet_liked_id, status) =>
      dispatch(match(id, pet_liked_id, status)),
    updateMatch: (id, pet_liked_id, status) =>
      dispatch(updateMatch(id, pet_liked_id, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
