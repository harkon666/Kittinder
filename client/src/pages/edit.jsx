import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-input-slider";
import { Card } from "react-bootstrap";
import { getSpecies } from "../_actions/species";
import { getAges } from "../_actions/age";
import { thisPet, updatePet } from "../_actions/pet";
import { thisUser } from "../_actions/user";
import { connect } from "react-redux";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import cat from "./cat.jpg";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 170
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Edit = props => {
  const [state, setState] = useState({ x: 10 });
  const classes = useStyles();
  const [age, setAge] = useState(0);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [name, setName] = useState();
  const [species, setSpecies] = useState("");
  const [editAge, setEditAge] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    props.getAges();
    props.getSpecies();
    props.thisPet();
  }, []);

  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <div className="row" style={{ marginLeft: "0px" }}>
      <div
        className="col-4 border-right"
        style={{ padding: "unset", maxHeight: "110vh", overflowY: "scroll" }}
      >
        <nav
          className="navbar bg-primary text-left shadow"
          style={{ height: 100 }}
        >
          <Link to="/home">
            <ExpandMoreIcon style={{ fontSize: 40, color: "white" }} />
            <img
              src={cat}
              height="50"
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
                <h3>test@mail.com</h3>
              </div>
            </div>
            <div className="row my-2">
              <div className="col">
                <h3>Phone</h3>
              </div>
              <div className="col text-right">
                <h3>+69 1236900</h3>
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
                    onChange={handleChange}
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
                    Type
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
                    <button className="btn btn-primary w-50 mx-auto">
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
                className="mx-auto border border-primary shadow"
                style={{ width: "22rem" }}
              >
                <div className="container shadow">
                  <div className="row bg-primary pb-3">
                    <ImgGroup />
                  </div>
                </div>
                <Card.Body
                  style={{
                    overflowY: "auto",
                    height: 250,
                    padding: 0,
                    overflowX: "hidden"
                  }}
                >
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th style={{ fontSize: "18px" }}>Cat Name</th>
                      </tr>
                      <tr>
                        <td className="text-muted justify-content-center">
                          <FormControl
                            variant="outlined"
                            style={{ width: "100%" }}
                          >
                            <InputLabel htmlFor="component-outlined">
                              Name
                            </InputLabel>
                            <OutlinedInput
                              id="component-outlined"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              label="Name"
                            />
                          </FormControl>
                        </td>
                      </tr>
                      <tr>
                        <th style={{ fontSize: "18px" }}>Age</th>
                      </tr>
                      <tr>
                        <td className="text-muted">
                          <FormControl
                            variant="outlined"
                            style={{ width: "100%" }}
                          >
                            <InputLabel
                              ref={inputLabel}
                              id="demo-simple-select-outlined-label"
                            >
                              Age
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={editAge}
                              onChange={e => setEditAge(Number(e.target.value))}
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
                        </td>
                      </tr>
                      <tr>
                        <th style={{ fontSize: "18px" }}>Gender</th>
                      </tr>
                      <tr>
                        <td>
                          <FormControl
                            variant="outlined"
                            style={{ width: "100%" }}
                          >
                            <InputLabel
                              ref={inputLabel}
                              id="demo-simple-select-outlined-label"
                            >
                              Age
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={gender}
                              onChange={e => setGender(e.target.value)}
                              labelWidth={labelWidth}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                      </tr>
                      <tr>
                        <th style={{ fontSize: "18px" }}>About Cat</th>
                      </tr>
                      <tr>
                        <td className="text-muted">
                          <TextField
                            value={about}
                            onChange={e => setAbout(e.target.value)}
                            id="outlined-multiline-static"
                            label="About"
                            multiline
                            rows="4"
                            defaultValue="About.."
                            variant="outlined"
                            style={{ width: "100%" }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <Link to="/home/profile"> */}
                  <div className="row pb-3">
                    <button
                      className="btn btn-primary w-50 mx-auto"
                      onClick={() =>
                        props.updatePet(
                          props.myPet.data[0].id,
                          name,
                          gender,
                          editAge,
                          about
                        )
                      }
                    >
                      Save
                    </button>
                    {console.log(props.myPet.data, "woi update")}
                  </div>
                  {/* </Link> */}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgGroup = () => {
  const objImg = {
    cat,
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
    h: ""
  };

  const Data = Object.keys(objImg);
  return Data.map((img, i) => (
    <div className="col-lg-4 mx-auto justify-content-center" key={i}>
      <Card
        className="bg-dark text-white mt-3"
        style={{
          width: "5rem",
          height: "6rem"
        }}
      >
        <Card.Img src={objImg[img]} alt="+" style={{ height: "100%" }} />
        <Card.ImgOverlay></Card.ImgOverlay>
      </Card>
    </div>
  ));
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
    thisPet: () => dispatch(thisPet()),
    updatePet: (pet_id, name, gender, age_id, about) =>
      dispatch(updatePet(pet_id, name, gender, age_id, about))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
