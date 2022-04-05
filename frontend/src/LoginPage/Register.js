import React, { useState } from "react";
import Axios from "axios";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";

function Register({ openRegister }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleUserRegister = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3333/api/v1/auth/create", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      password: password,
    })
      .then((response) => {
        if (response.data.success === true) {
          console.log("Success========: " + response.data.user);
          console.log("In frontend register");
          window.location.pathname = "/login";
        } else {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <nav className="login_nav">
        <div className="icon">
          <Link
            to="/login"
            onClick={() => {
              openRegister(false);
            }}
          >
            <ChevronLeftIcon className="svg_icon" />
          </Link>
        </div>
        <div className="title_login">
          <h2>
            <span style={{ color: "#007fad" }}>Rad</span>
            <span style={{ color: "orange" }}>iss</span>
            <span style={{ color: "red" }}>on</span>
          </h2>
        </div>
        <div></div>
      </nav>
      <div className="login_body">
        <div className="login">
          <h2>Create your account </h2>
          <p style={{ paddingTop: "10px" }}>
            Add a strong password to finish up
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="email">First Name</label>
              <br />
              <input
                type="text"
                className="email"
                id="email"
                placeholder="First Name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Last Name</label>
              <br />
              <input
                type="text"
                className="email"
                id="email"
                placeholder="Last Name"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Phone Number</label>
              <br />
              <input
                type="text"
                className="email"
                id="email"
                placeholder="Phone Number"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                className="email"
                id="email"
                placeholder="Email address"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                className="password"
                id="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>

            <button
              onClick={handleUserRegister}
              className="login_btn"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
