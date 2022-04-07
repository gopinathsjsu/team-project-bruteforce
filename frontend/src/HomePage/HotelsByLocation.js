import React, { useState } from "react";
import "./HotelsByLocation.css";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { hotels } from "../HomePage/HotelDetail/db";

function HotelsByLocation() {
  const [hotelsByLocation, setHotelsByLocation] = useState([]);

  let renderFavourites = null;

  renderFavourites = hotels.hotel.map((pro) => {
    console.log(pro);
    return (
      <div className="home_cards col-md-4 mb-4">
        <div style={{ overflow: "hidden" }} className="home_card card">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "5px",
            }}
            className="favourite_icon"
            onClick={() => {
              // handleFavourite(pro.itemId, user.id);
            }}
          >
            <FavoriteTwoToneIcon />
          </div>
          <img
            src={pro.images[0]}
            // src={require("../Images/" + pro.itemImage)}
            className="card-img-top"
            alt="..."
          />

          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="card-body"
          >
            <h5 className="card-title">{pro.city}</h5>
            <p className="card-title">${pro.price} / night</p>

            {/* <p className="card-text">{pro.descripition}</p> */}
            {/* <button className="btn-sm btn-dark">Edit</button> */}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-2">
            <p
              style={{ fontSize: "20px", fontWeight: "bold" }}
              className="categories_title"
            >
              Top Most visited hotels by everyone!
            </p>
          </div>
          <div className="col-md-9">
            <div className="row"> {renderFavourites} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelsByLocation;
