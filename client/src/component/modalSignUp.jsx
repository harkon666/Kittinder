import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { getSpecies } from "../_actions/species";
import { register } from "../_actions/register";
import { getAges } from "../_actions/age";

function ModalSignup(props) {
  useEffect(() => {
    props.getSpecies();
    props.getAges();
  }, []);

  const [breeder, setBreeder] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setNamePet] = useState("");
  const [gender, setGender] = useState("");
  const [species_id, setSpecies] = useState(0);
  const [age_id, setAges] = useState(0);
  const [is_admin, setAdmin] = useState(false);

  const { data } = props.species;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ width: "50vw" }}
    >
      <Modal.Body className="text-center" closeButton>
        <h4 className="mb-5 mt-3 font-signup">Sign Up</h4>
        <Form>
          <Row className="mx-3 my-3">
            <Col>
              <Form.Control
                placeholder="Full Name"
                value={breeder}
                onChange={e => setBreeder(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mx-3 my-3">
            <Col>
              <Form.Control
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mx-3 my-3">
            <Col>
              <Form.Control
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mx-3 my-3">
            <Col>
              <Form.Control
                placeholder="Phone Breeder"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mx-3 my-3">
            <Col>
              <Form.Control
                placeholder="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mx-3 my-3">
            <Col>
              <Form.Control
                placeholder="Name Pet"
                value={name}
                onChange={e => setNamePet(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mx-3 my-3">
            <Col>
              <Form.Control
                as="select"
                value={gender}
                onChange={e => setGender(e.target.value)}
              >
                <option disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={species_id}
                onChange={e => setSpecies(Number(e.target.value))}
              >
                <option disabled>Species</option>
                {data.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={age_id}
                onChange={e => setAges(Number(e.target.value))}
              >
                <option disabled>Ages</option>
                {props.age.data.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
        </Form>
        <button
          className="btn btn-primary text-white"
          onClick={() => {
            props.register(
              breeder,
              email,
              password,
              phone,
              address,
              is_admin,
              name,
              gender,
              species_id,
              age_id
            );
          }}
          style={{ width: "25%" }}
        >
          Sign Up
          {console.log(props.register, age_id, species_id, "regis")}
          {console.log(props.register, "regis")}
        </button>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    species: state.species,
    register: state.register,
    age: state.age
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSpecies: () => dispatch(getSpecies()),
    getAges: () => dispatch(getAges()),
    register: (
      breeder,
      email,
      password,
      phone,
      address,
      is_admin,
      namePet,
      gender,
      species,
      ages
    ) =>
      dispatch(
        register(
          breeder,
          email,
          password,
          phone,
          address,
          is_admin,
          namePet,
          gender,
          species,
          ages
        )
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSignup);
