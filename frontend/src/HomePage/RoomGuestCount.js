import React, { useState } from "react";
import "./RoomGuest.css";

function RoomGuestCount({ countList }) {
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);

  const increaseCount = () => {
    if (guestCount < 12) {
      setGuestCount(Number(guestCount) + 1);
    }
  };

  const decreaseCount = () => {
    if (guestCount > 2) {
      setGuestCount(Number(guestCount) - 1);
    }
  };

  const increaseRoomCount = () => {
    if (roomCount < 6) {
      setRoomCount(Number(roomCount) + 1);
    }
  };

  const decreaseRoomCount = () => {
    if (roomCount > 1) {
      setRoomCount(Number(roomCount) - 1);
    }
  };

  const resetValues = () => {
    setGuestCount(2);
    setRoomCount(1);
  };

  return (
    <div className="count_modal">
      <div className="count_content">
        <div className="guests_rooms_count">
          <div className="guests">
            <div
              style={{
                width: "30%",
                display: "inline-block",
              }}
            >
              <span style={{ marginRight: "20px" }}>Guests</span>
            </div>
            <button className="changeBtn" onClick={decreaseCount}>
              -
            </button>
            <input
              className="inputCount"
              type="text"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            ></input>
            <button className="changeBtn" onClick={increaseCount}>
              +
            </button>
          </div>
          <div className="rooms">
            <div
              style={{
                width: "30%",
                display: "inline-block",
              }}
            >
              <span style={{ marginRight: "20px" }}>Rooms</span>
            </div>
            <button className="changeBtn" onClick={decreaseRoomCount}>
              -
            </button>
            <input
              className="inputCount"
              type="text"
              value={roomCount}
              onChange={(e) => setRoomCount(e.target.value)}
            ></input>
            <button className="changeBtn" onClick={increaseRoomCount}>
              +
            </button>
          </div>
          <div className="buttons">
            <button className="reset" type="submit" onClick={resetValues}>
              Reset
            </button>
            <button className="submitCount" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomGuestCount;
