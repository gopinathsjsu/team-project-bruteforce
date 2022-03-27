import React from "react";
import "./Dashboard.css";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AddLocation, AddLocationTwoTone } from "@material-ui/icons";

function Dashboard() {
  return (
    <>
      <div className="wrapper">
        <div className="title_logo">
          <div className="logo">
            <h1>
              <span style={{ color: "#5894d9" }}>Rad</span>
              <span style={{ color: "orange" }}>iss</span>
              <span style={{ color: "red" }}>on</span>
            </h1>
            <p className="logo_title">Deals from your favorite booking sites</p>
          </div>
          <p className="logo_des">
            Try searching for a city, a specific hotel, or even a landmark!
          </p>
        </div>
        <div className="search_bar">
          <form className="search_form">
            <AddLocation />
            <input
              type="text"
              placeholder="Enter a hotel name or destination "
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
