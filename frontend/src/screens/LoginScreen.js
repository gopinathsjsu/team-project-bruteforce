import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function Login() {
    setLoading(true);
    const user = {
      email,
      password,
    };
    if (!email) {
      setError("Email is a required field");
    } else if (!password) {
      setError("Please enter the password");
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      setError(
        "Password need to be 6 to 16 character including at least one number , one letter and special character in it"
      );
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError("Please use a valid email address!");
    } else {
      try {
        const result = (
          await axios.post("http://202loadbalancer-1845045619.us-east-2.elb.amazonaws.com:4000/api/users/login", user)
        ).data;
        console.log("In post login");
        console.log(result);
        localStorage.setItem("currentUser", JSON.stringify(result));
        window.location.href = "/admin";
      } catch (error) {
        console.log(error);
        setError("Invalid Credentials");
      }
      setLoading(false);
    }
  }
  return (
    <div>
      {loading && <Loader></Loader>}
      <div
        style={{
          // backgroundColor: "green",
          width: "65%",
          height: "715px",
          backgroundSize: "100% 100%",
          filter: "blur(2px)",
          backgroundImage:
            "url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      ></div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error.length > 0 && <Error msg={error}></Error>}
          <div
            style={{
              marginTop: "-100%",
              marginLeft: "70%",
              backgroundColor: "white",
            }}
            className="bs"
          >
            <h2>Login</h2>

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
            {loading ? (
              <div>Login...Please Wait...</div>
            ) : (
              <button
                style={{ border: "none", marginLeft: "41%" }}
                className="btn btn-primary mt-3"
                onClick={Login}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
