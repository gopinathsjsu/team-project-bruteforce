import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function register() {
    const user = {
      name,
      email,
      password,
      cpassword,
    };
    //console.log(user);
    setLoading(true);
    setError("");
    setSuccess("");
    if (!name) {
      setError("Name is a required field");
      setLoading(false);
    } else if (!email) {
      setError("Email is a required field");
      setLoading(false);
    } else if (!password || !cpassword) {
      setError("Please enter both passwords");
      setLoading(false);
    } else if (password !== cpassword) {
      setError("Passwords do not match!");
      setLoading(false);
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      setError(
        "Password need to be 6 to 16 character including at least one number , one letter and special character in it"
      );
      setLoading(false);
    } else if (name.length < 4) {
      setError("Name is too short");
      setLoading(false);
    } else if (/\d/.test(name)) {
      setError("Name cannot contain numeric characters");
      setLoading(false);
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError("Please use a valid email address!");
      setLoading(false);
    } else {
      try {
        const result = (
          await axios.post("http://localhost:4000/api/users/register", user)
        ).data;
        console.log(result);
        setSuccess(result);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <Loader></Loader>}
      {error.length > 0 && <Error msg={error}></Error>}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success.length > 0 && <Success msg={success}></Success>}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br></br>

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br></br>

            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br></br>

            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            <br></br>

            {loading ? (
              <div>Registering... Please Wait...</div>
            ) : (
              <button
                style={{
                  border: "none",
                  marginLeft: "41%",
                }}
                className="btn btn-primary mt-3"
                onClick={register}
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
