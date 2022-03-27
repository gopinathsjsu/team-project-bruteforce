import React from "react";
import "./loginPage.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";

function loginPage() {
  return (
    <>
      <div className="login_page">
        <nav className="login_nav">
          <div className="icon">
            <Link to="/">
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
            <h2>Login or create account</h2>
            <p style={{ paddingTop: "10px" }}>
              Enter your e-mail address to start
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

              <button className="login_btn" type="submit">
                Login
              </button>
            </form>
          </div>
          <p
            style={{ marginTop: "55px", fontFamily: "Arial", fontSize: "15px" }}
          >
            Reminder: by signing up, you are agreeing to our Privacy Policy and
            Terms of Use.
          </p>
        </div>
      </div>
      <div className="register_body">
        <p>Don't have an account yet?</p>
        <button className="register_btn" type="submit">
          Create an account
        </button>
      </div>
    </>
  );
}

export default loginPage;
