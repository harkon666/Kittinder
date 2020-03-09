import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-input-slider";
import { Card } from "react-bootstrap";
import { thisUser } from "../_actions/user";
import { getSpecies } from "../_actions/species";
import { getAges } from "../_actions/age";
import { thisPet } from "../_actions/pet";
import { connect } from "react-redux";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import cat from "./cat.jpg";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 181
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Profile = props => {
  const [state, setState] = useState({ x: 10 });
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("");
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [pet, setPet] = useState(false);
  const [premium, setPremium] = useState(false);
  const [afterPet, setAfterPet] = useState(false);

  const petData = props.myPet.data;

  React.useEffect(async () => {
    setLabelWidth(inputLabel.current.offsetWidth);
    await props.thisUser();
    await props.getAges();
    await props.getSpecies();
  }, []);

  React.useEffect(() => {
    props.thisPet();
  }, []);

  console.log(props.thisUserOnline, "woi");
  return (
    <div className="row" style={{ marginLeft: "0px" }}>
      <div
        className="col-4 border-right"
        style={{ padding: "unset", maxHeight: "100vh", overflowY: "scroll" }}
      >
        <nav
          className="navbar bg-primary text-left shadow"
          style={{ height: 100 }}
        >
          <Link to="/home">
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
            <b>Profile Pet</b>
          </h2>
        </nav>
        <div className="container pb-3">
          <h2 className="mt-4 mb-2 text-primary">Account Setting</h2>
        </div>
        <div className="bg-light py-3 shadow">
          <div className="container">
            <div className="row my-2 border-bottom">
              <div className="col">
                <h3>Email</h3>
              </div>
              <div className="col text-right">
                <h3>{props.thisUserOnline.data.email}</h3>
              </div>
            </div>
            <div className="row my-2">
              <div className="col">
                <h3>Phone</h3>
              </div>
              <div className="col text-right">
                <h3>{props.thisUserOnline.data.phone}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container pb-3">
          <h2 className="mt-4 mb-2 text-primary">Discovery Setting</h2>
        </div>
        <div className="bg-light py-3 shadow">
          <div className="container">
            <div className="row my-2">
              <div className="col">
                <h5>Maximum Distance</h5>
              </div>
              <div className="col text-right">
                <h5>{state.x} KM</h5>
              </div>
            </div>
            <div className="row py-2">
              <div className="container mx-3">
                <Slider
                  axis="x"
                  x={state.x}
                  onChange={({ x }) => setState(state => ({ ...state, x }))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="row py-2 mt-3">
              <div className="container">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.age.data.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    Species
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={species}
                    onChange={e => setSpecies(e.target.value)}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.species.data.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Link to="/">
                  <div className="row mt-3">
                    <button
                      className="btn btn-primary w-50 mx-auto"
                      onClick={() => {
                        localStorage.removeItem("jwToken");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-8 bg-light" style={{ minHeight: "100vh" }}>
        <div className="container py-5">
          <div className="row" style={{ marginRight: 0 }}>
            <div className="col-10">
              <Card
                className="mx-auto border border-primary"
                style={{ width: "22rem" }}
              >
                <Card.Img variant="top" src={cat} className="shadow" />
                <Card.Body style={{ overflowY: "auto", height: 250 }}>
                  <div className="row">
                    <div className="col">
                      <h2>
                        <b>{petData.length < 1 ? <></> : petData[0].name}</b>
                      </h2>
                    </div>
                    <div className="col text-right text-muted mt-1">
                      <h5>
                        {petData.length < 1 ? (
                          <>TUnggu</>
                        ) : (
                          petData[0].species_id
                        )}{" "}
                        test species
                      </h5>
                    </div>
                  </div>
                  <Card.Text className="py-2">
                    <h6>Breeder : {props.thisUserOnline.data.breeder}</h6>
                    <h6>10 KM away</h6>
                    <h6>
                      {petData.length < 1 ? <>TUnggu</> : petData[0].gender} -{" "}
                      {petData.length < 1 ? <>TUnggu</> : petData[0].age_id}{" "}
                      test age
                    </h6>
                    <h6>Phone: {props.thisUserOnline.data.phone}</h6>
                  </Card.Text>
                  <h2>
                    <b>About Pet</b>
                  </h2>
                  <Card.Text className="py-2">
                    <h6>
                      {petData.length < 1 ? (
                        <></>
                      ) : petData[0].about ? (
                        petData[0].about
                      ) : (
                        <>insert about your pet for everyone</>
                      )}
                    </h6>
                  </Card.Text>
                  <Link to="/home/profile/edit">
                    <div className="row pb-3">
                      <button className="btn btn-primary w-50 mx-auto">
                        Edit Pet
                      </button>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </div>
            <div className="col-2">
              <button
                className="btn btn-primary w-100 py-2"
                onClick={() => setPet(true)}
              >
                Add Pet
              </button>
              <Modal
                show={pet}
                onHide={() => {
                  setPet(false);
                }}
                animation={false}
              >
                <div className="bg-primary text-center container">
                  <h1 className="my-5 text-white">
                    <b>Premium</b>
                  </h1>
                  <p className="text-light">
                    Upgrade your <b>Kittinder</b> for get our premium features
                    and make your cat happy
                  </p>
                  <h5 className="my-5 text-white">Kittinder : 072139920</h5>
                  <input
                    className="form-control w-75 mx-auto form-control-lg"
                    type="text"
                    placeholder="Your CC Number"
                  />
                  <Camera />
                  <div className="text-center mb-5">
                    <button
                      className="btn btn-light w-50 text-primary"
                      onClick={() => {
                        setPet(false);
                        setAfterPet(true);
                      }}
                    >
                      Be Premium
                    </button>
                  </div>
                </div>
              </Modal>

              <Modal
                show={afterPet}
                onHide={() => {
                  setAfterPet(false);
                  setPremium(true);
                }}
                animation={true}
              >
                <div className="bg-primary text-center container">
                  <h3 className="text-white">
                    Thank you, Please wait for a while
                  </h3>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Camera = () => {
  const classes = useStyles();

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        hidden
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          className={classes.margin}
          style={{ height: "200px", width: "250px" }}
        >
          <PhotoCamera fontSize="large" style={{ color: "white" }} />
        </IconButton>
        <p className="text-light">Proof us if you have bought Premium</p>
      </label>
    </>
  );
};

const mapStateToProps = state => {
  return {
    thisUserOnline: state.user,
    age: state.age,
    species: state.species,
    myPet: state.pet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thisUser: () => dispatch(thisUser()),
    getAges: () => dispatch(getAges()),
    getSpecies: () => dispatch(getSpecies()),
    thisPet: () => dispatch(thisPet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
