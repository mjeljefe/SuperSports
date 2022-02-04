import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../reducks/users/operations";
import Home from "../containers/Home";
import Cross from "../assets/img/cross01.svg";

import { push } from "connected-react-router";
import MainImage from "../components/Common/MainImage";

const Signin = () => {
  const dispatch = useDispatch();

  const closeButton = () => {
    dispatch(push("/"));
  };

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = (event) => {
    setEmail(event.target.value);
  };

  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const signInButton = () => {
    dispatch(signIn(email, password));
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <Home />
      <section class="popup01">
        <div class="popup-inner01">
          <img src={Cross} class="cross01" onClick={closeButton} />
          <h1 class="heading01"> SuperSports </h1>
          <h2 class="head2">SIGN IN</h2>
          <div class="popup-input01">
            <input
              type="email"
              required
              placeholder="Email-address"
              name="email"
              value={email}
              onChange={inputEmail}
            />
            <br />
            <br />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={inputPassword}
            />
            <br /> <br />
            <button onClick={signInButton}>Sign In</button>
            <br />
            <br />
            <p>
              New Member <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
