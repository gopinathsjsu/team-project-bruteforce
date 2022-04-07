import React, { useState } from "react";
import "./Dashboard.css";
import { SearchHomePage } from "./SearchHomePage";

function Dashboard() {
  return (
    <>
      <div className="wrapper">
        <div className="title_logo">
          <div
            style={{
              width: "106%",
              // backgroundColor: "red",
            }}
            className="logo"
          >
            <h1>
              <span style={{ color: "#5894d9" }}>Rad</span>
              <span style={{ color: "orange" }}>iss</span>
              <span style={{ color: "red" }}>on</span>
            </h1>
            <p
              style={{
                fontFamily: "Proxima Vara,Arial,Helvetica,Sans,Sans-Serif",
                marginLeft: "7%",
              }}
              className="logo_title"
            >
              Deals from your favorite booking sites
            </p>
          </div>
          <p className="logo_des">
            Try searching for a city, a specific hotel, or even a landmark!
          </p>
        </div>
        <SearchHomePage />
      </div>
    </>
  );
}

export default Dashboard;
