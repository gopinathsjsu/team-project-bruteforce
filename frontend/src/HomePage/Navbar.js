import React from "react";
import "./Navbar.css";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Navbar() {
  const handleOpenLogin = () => {
    console.log("Login opened");
    <Link></Link>;
  };
  return (
    <div className="navbar">
      <div className="icons">
        <ul className="nav_icons">
          <Link className="nav_icon login_icon" to="/login">
            Log in
          </Link>

          <li className="nav_icon">Menu</li>
          <span
            className="icon_down"
            style={{
              display: "inline-block",
              // marginTop: "6px",
            }}
          >
            <KeyboardArrowDown />
          </span>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
