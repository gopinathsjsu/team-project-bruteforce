import React, { useState } from "react";
import "./Dashboard.css";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { SearchOutlined, People } from "@material-ui/icons";
import RoomGuestCount from "./RoomGuestCount";

function Dashboard() {
  const [showCountList, setShowCountList] = useState(false);

  const handleSelectRoomsGuests = () => {
    setShowCountList(true);
  };

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
            <SearchOutlined
              style={{
                position: "absolute",
                top: "30%",
                left: "10%",
                marginLeft: "7px",
                transform: "scale(1.2)",
              }}
            />
            <input
              className="location"
              type="text"
              placeholder="Enter a hotel name or destination "
            />

            <label className="check_date" htmlFor="check_dates">
              Check in
            </label>
            <input className="check_dates" type="date"></input>

            <label className="check_date" htmlFor="check_dates">
              Check out
            </label>
            <input className="check_dates" type="date"></input>
            <div className="guest-room-count">
              <People />
              <button
                className="select-guests-rooms"
                onClick={handleSelectRoomsGuests}
                type="button"
              >
                1 Room 2 Guests
              </button>
            </div>
            <button className="searchBtn">Search</button>
          </form>
        </div>
        {showCountList && <RoomGuestCount countList={setShowCountList} />}
      </div>
    </>
  );
}

export default Dashboard;
