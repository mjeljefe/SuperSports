import React, { useEffect, useState } from "react";
import SuperSports from "../../assets/img/SuperSports.png";
import Signup from "../../assets/img/signup.svg";
import { signOut } from "../../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

export default function Header() {
  const dispatch = useDispatch();
  const key = localStorage.getItem("LOGIN_USER_KEY");
  const [checkUser, setCheckUser] = useState(false);

  const signOutButton = () => {
    dispatch(signOut());
    setCheckUser(false);
    dispatch(push("/"));
  };

  useEffect(() => {
    if (key != null) {
      setCheckUser(true);
    }
  }, [key]);

  return (
    <header>
      <nav>
        <img src={SuperSports} alt="" />

        <div class="signup">
          {checkUser ? (
            <span class="logout" onClick={signOutButton}>
              Logout
            </span>
          ) : (
            <a href="/signin">Sign In</a>
          )}
          {checkUser && <img src={Signup} alt="" />}
        </div>
      </nav>
    </header>
  );
}
