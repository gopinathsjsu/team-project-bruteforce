import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";

function Register({ openRegister }) {
  const handleUserRegister = () => {
    console.log("handle register");
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
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                className="email"
                id="email"
                placeholder="Email address"
                // onChange={(event) => {
                //   setEmail(event.target.value);
                // }}
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
                // onChange={(event) => {
                //   setEmail(event.target.value);
                // }}
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
