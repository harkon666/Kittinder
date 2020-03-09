import React, { useState } from "react";

import ModalLogin from "../component/modalLogin";
import ModalSignup from "../component/modalSignUp";

import cat from "./cat.jpg";

import "froala-editor/css/froala_editor.pkgd.min.css";

const Landing = props => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);
  const error = false;
  const loading = false;

  if (error) return <h1>Unknown error occured!</h1>;

  return !loading ? (
    <>
      <section class="fdb-block">
        <div
          class="col-fill-right"
          style={{ backgroundImage: `url(${cat})` }}
        ></div>

        <div class="container py-5" style={{ height: "50vh" }}>
          <div class="row">
            <div class="col-12 col-md-5 text-center">
              <h1 class="text-primary">Kittinder</h1>
              <p class="lead">
                Every Cats in the world would be happy if the owner use our
                features
              </p>
              <div className="mt-4 mb-5">
                <button
                  className="btn btn-primary mx-3"
                  style={{ width: "100px" }}
                  onClick={() => setModalSignup(true)}
                >
                  Register
                </button>
                <ModalSignup
                  show={modalSignup}
                  onHide={() => setModalSignup(false)}
                />
                <button
                  className="btn btn-primary mx-3"
                  style={{ width: "100px" }}
                  onClick={() => setModalLogin(true)}
                >
                  Login
                </button>
                <ModalLogin
                  show={modalLogin}
                  onHide={() => setModalLogin(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="fdb-block footer-small bg-primary fixed-bottom text-white">
        <div class="container">
          <div class="row text-center align-items-center">
            <div class="col-12 col-sm-6 col-md-4 text-sm-left">
              <h1>Kittinder</h1>
            </div>

            <div class="col-12 col-sm-6 col-md-4 mt-4 mt-sm-0 text-center text-sm-right text-md-center">
              © 2020 Kittinder
            </div>

            <div class="col-12 col-md-4 mt-4 mt-md-0 text-center text-md-right">
              <a href="#" class="mx-2">
                <i class="fab fa-twitter text-white" aria-hidden="true"></i>
              </a>
              <a href="#" class="mx-2">
                <i class="fab fa-facebook text-white" aria-hidden="true"></i>
              </a>
              <a href="#" class="mx-2">
                <i class="fab fa-instagram text-white" aria-hidden="true"></i>
              </a>
              <a href="#" class="mx-2">
                <i class="fab fa-pinterest text-white" aria-hidden="true"></i>
              </a>
              <a href="#" class="mx-2">
                <i class="fab fa-google text-white" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  ) : (
    <h1>Now Loading...</h1>
  );
};

export default Landing;
