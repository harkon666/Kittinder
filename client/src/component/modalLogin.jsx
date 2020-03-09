import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../_actions/login";
import { Modal, Form, Row, Col } from "react-bootstrap";

function ModalLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      {...props}
      size="lg"
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ width: "50%" }}
    >
      <Modal.Body className="text-center">
        {props.userLogin.data.message === "success" ||
        props.userLogin.data.message === undefined ? (
          <>
            <h1 class="text-primary">Login</h1>
          </>
        ) : props.userLogin.data.message ===
          "Request failed with status code 401" ? (
          <>
            <h1 class="text-primary">Login</h1>
            <p className="text-danger"> Wrong Password </p>
          </>
        ) : (
          <>
            <h1 class="text-primary">Login</h1>
            <p className="text-danger"> {props.userLogin.data.message} </p>
          </>
        )}
        <Form>
          <Row className="mx-5 my-3">
            <Col>
              <Form.Control
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mx-5 my-3">
            <Col>
              <Form.Control
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
        <button
          className="btn btn-primary"
          onClick={() => {
            props.login(email, password);
          }}
          style={{ width: "25%" }}
        >
          {console.log(props.userLogin, "woi")}
          Login
        </button>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    userLogin: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);
