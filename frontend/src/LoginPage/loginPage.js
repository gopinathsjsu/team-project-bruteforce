import React, { useState } from "react";
import "./loginPage.css";

import Login from "./login";
import Register from "./Register";

function LoginPage() {
  const [openRegister, setOpenRegister] = useState(false);

  let login = null;
  if (openRegister) {
    login = (
      <>
        <Register openRegister={setOpenRegister} />
      </>
    );
  } else {
    login = (
      <>
        <Login />
        <div className="register_body">
          <p>Don't have an account yet?</p>
          <button
            onClick={() => setOpenRegister(true)}
            className="register_btn"
            type="submit"
          >
            Create an account
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="login_page">{login}</div>
    </>
  );
}

export default LoginPage;
