import React from "react";
import "./Navbar.css";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowDown } from "@material-ui/icons";

function Navbar() {
  return (
    <div className="navbar">
      <div className="icons">
        <ul className="nav_icons">
          <li className="nav_icon">Log in</li>
          <li className="nav_icon">Menu</li>
          <span
            className="icon_down"
            style={{
              display: "inline-block",
              marginTop: "6px",
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
