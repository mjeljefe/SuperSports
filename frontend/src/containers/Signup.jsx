import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../reducks/users/operations";
import Cross from "../assets/img/cross01.svg";
import Home from "../containers/Home";
import { push } from "connected-react-router";

const SignUp = () => {
  const dispatch = useDispatch();

  const closeButton = () => {
    dispatch(push("/"));
  };
  const [user_name, setUserName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const inputUserName = (event) => {
    setUserName(event.target.value);
  };
  const inputEmail = (event) => {
    setEmail(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };
  const signUpButton = () => {
    dispatch(signUp(user_name, email, password));
    setUserName("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <Home />
      <section class="popup">
        <div class="popup-inner">
          <img src={Cross} onClick={closeButton} class="cross" alt="" />
          <h1 class="heading"> SuperSports </h1>
          <h2>SIGN UP</h2>
          <div class="popup-input">
            <input
              type="name"
              required
              placeholder="Name"
              onChange={inputUserName}
              name="user_name"
              value={user_name}
            />
            <br />
            <br />
            <input
              type="email"
              required
              placeholder="Email-address"
              onChange={inputEmail}
              name="email"
              value={email}
            />
            <br />
            <br />
            <input
              type="password"
              onChange={inputPassword}
              required
              placeholder="Password"
              name="psw"
              value={password}
            />
            <br /> <br />
            <button onClick={signUpButton}>SIGN UP</button>
            <br />
            <br />
            <p>
              New Member <a href="/signin">Sign In</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
