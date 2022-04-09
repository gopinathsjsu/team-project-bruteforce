import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { SearchOutlined, People } from "@material-ui/icons";
import RoomGuestCount from "./RoomGuestCount";
import AutoCompleteLoc from "./AutoCompleteLoc";
import styles from "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();
  const [showCountList, setShowCountList] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [location, setLocation] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");

  const handleSelectRoomsGuests = () => {
    setShowCountList(true);
  };

  const handleSearchData = (e) => {
    e.preventDefault();
    console.log("Handle search data");
    console.log(
      checkinDate + " - " + checkoutDate + " - " + roomCount + guestCount
    );
    navigate("/hotels");
  };

  return (
    <div>
      <div className="search_bar">
        <form className="search_form">
          {/* <SearchOutlined
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
            /> */}

          <div className="searchLocation">
            <AutoCompleteLoc />
          </div>
          <div className="date_picker">
            <label className="check_date" htmlFor="check_dates">
              Check in
            </label>
            <input
              style={{ height: "50px" }}
              onChange={(e) => setCheckinDate(e.target.value)}
              className="check_dates"
              type="date"
            ></input>
          </div>

          <div className="date_picker">
            <label className="check_date" htmlFor="check_dates">
              Check out
            </label>
            <input
              style={{ height: "50px" }}
              onChange={(e) => setCheckoutDate(e.target.value)}
              className="check_dates"
              type="date"
            ></input>
          </div>

          <div className="guest-room-count">
            <button
              style={{ height: "50px" }}
              className="select-guests-rooms"
              onClick={handleSelectRoomsGuests}
              type="button"
            >
              {roomCount} Room {guestCount} Guests
            </button>
          </div>
          <div className="searchHotel">
            <button
              style={{ height: "50px" }}
              className="searchBtn"
              onClick={handleSearchData}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {showCountList && (
        <RoomGuestCount
          setGuestCount={setGuestCount}
          setRoomCount={setRoomCount}
          roomCount={roomCount}
          guestCount={guestCount}
        />
      )}
    </div>
  );
};
