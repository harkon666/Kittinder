import React from "react";
import { Link } from "react-router-dom";
import { thisUser } from "../_actions/user";
import { thisPet } from "../_actions/pet";
import { matched } from "../_actions/match";
import { connect } from "react-redux";

import cat from "./cat.jpg";
import Deck from "./deck";
import { Card } from "react-bootstrap";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./deck.css";
import { useEffect } from "react";
import { useState } from "react";

import test from "./cat.jpg";

const Home = props => {
  const petData = props.myPet.data;
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    props.thisPet();
  }, []);

  if (props.myPet.data.length > 0) {
    console.log(props.myPet, "galak gannn");
    if (!flag) {
      props.matched(props.myPet.data[0].id);
      setFlag(true);
    }
  }

  return (
    <div className="row" style={{ marginLeft: "0px" }}>
      <div className="col-4 border-right" style={{ padding: "unset" }}>
        <nav className="navbar bg-primary text-left" style={{ height: 100 }}>
          <Link to="/home/profile">
            <ExpandMoreIcon style={{ fontSize: 40, color: "white" }} />
            <img
              src={cat}
              height="70"
              width="70"
              alt="image"
              className="rounded-circle mx-3"
            />
          </Link>
          <h2 className="text-white mr-auto">
            {petData.length < 1 ? <></> : petData[0].name}
          </h2>
        </nav>
        <div className="container">
          <h3 className="border-bottom mt-2">Match</h3>
          <div className="row mr-2">
            {props.match.matched.show != undefined ? (
              <>
                {" "}
                {props.match.matched.show.length > 0 ? (
                  props.match.matched.show.map((img, i) => (
                    <div className="col-lg-4" key={i}>
                      <Card
                        className="bg-dark text-white fluid ml-2 mt-4 shadow"
                        style={{ width: "7rem", height: "10rem" }}
                      >
                        <Card.Img
                          src={test}
                          alt="Card image"
                          style={{ height: "100%" }}
                        />
                        <Card.ImgOverlay>
                          <Card.Title
                            className="deck-card"
                            style={{ marginTop: 100 }}
                          >
                            {img.pet2.name}
                          </Card.Title>
                        </Card.ImgOverlay>
                      </Card>
                    </div>
                  ))
                ) : (
                  <>
                    <h2>Loading</h2>{" "}
                  </>
                )}
              </>
            ) : (
              <> </>
            )}
          </div>
        </div>
      </div>
      <div className="col-8 bg-light" style={{ minHeight: "100vh" }}>
        <div className="row" id="deck">
          <Deck />
        </div>
        <div
          style={{ marginTop: "450px", position: "fixed", marginLeft: "270px" }}
        >
          <button
            className="btn btn-warning rounded-circle mx-2"
            style={{ height: 50 }}
          >
            <AutorenewIcon />
          </button>
          <button
            className="btn btn-danger rounded-circle mx-2"
            style={{ height: 75, width: 65 }}
          >
            <ThumbDownIcon />
          </button>
          <button
            className="btn btn-primary rounded-circle mx-2"
            style={{ height: 75, width: 65 }}
          >
            <FavoriteIcon />
          </button>
          <button
            className="btn rounded-circle mx-2 border-dark"
            style={{ height: 50 }}
          >
            <FlashOnIcon />
          </button>
        </div>
        <footer
          class="fdb-block bg-primary fixed-bottom ml-auto"
          style={{ height: 5, maxWidth: "66.35%" }}
        >
          <div class="container">
            <div class="row text-center" style={{ margin: -20 }}>
              <div class="col">
                <button
                  className="btn btn-light border text-primary mx-3"
                  style={{ width: 80 }}
                >
                  Hide
                </button>
                <button className="btn btn-light border text-primary mx-3">
                  <ChevronLeftIcon /> No
                </button>
                <button className="btn btn-light border text-primary mx-3">
                  <ChevronRightIcon /> Yes
                </button>
                <button className="btn btn-light border text-primary mx-3">
                  <ExpandMoreIcon /> Open Profile
                </button>
                <button className="btn btn-light border text-primary mx-3">
                  <ExpandLessIcon /> Close Profile
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    thisUserOnline: state.user,
    myPet: state.pet,
    match: state.match
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thisUser: () => dispatch(thisUser()),
    thisPet: () => dispatch(thisPet()),
    matched: id => dispatch(matched(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
