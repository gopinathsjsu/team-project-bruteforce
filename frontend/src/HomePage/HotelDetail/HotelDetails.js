import { Slider } from "./Slider";
import "./HotelDetails.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { hotels } from "./db";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Search } from "../Search";
import  Amenities  from "./Amenities";

const Div = styled.div`
  & header > img {
    padding: 20px;
  }
`;

export function HotelDetails() {
  const { id } = useParams();
  const [pageData, setPageData] = useState([]);
  const [pageImg, setPageImg] = useState([]);
  useEffect(() => {
    const data = hotels;
    const images = data.hotel[id - 1].images;
    setPageImg(images);

    setPageData(data.hotel[id - 1]);
  });

  return (
    <div>
      <Div
        style={{
          position: "fixed",
          zIndex: "999999999",
          backgroundColor: "#fff",
          width: "100%",
          height: "70px",
        }}
      >
        <div
          style={{
            height: "50px",
            width: "100%",
            marginTop: "-30px",
            backgroundColor: "white",
          }}
        >
          <Search />
        </div>
      </Div>
      <Slider arr={pageImg} />
      <>
        <div className="product-details-parent-div">
          <div className="product-details-child-left-div">
            <h3>{pageData.name}</h3>
            <p>{pageData.location}</p>
            <p className="located">Located in {pageData.city}</p>
            <h5>Description</h5>
            <p>{pageData.description}</p>
            <p className="redFont">Read more</p>
            <h5>Amenities</h5>
            <div>
               <Amenities/>
            </div>
            <p className="redFont">Show more</p>
            <h4>Choose your room</h4>
            <div>
              <p className="selected-category">SELECTED CATEGORY</p>
              <div className="selected-room-div">
                <div className="spotAndGreenTick">
                  <h3>SPOT-ON NON-AC</h3>
                  <img
                    src="/general-Icons/green-tick.png"
                    className="green-tick"
                    alt=""
                  />
                </div>
                <div>
                  <img src={pageImg[0]} className="single-image-room" alt="" />
                </div>
              </div>
              <hr />

              <div className="selected-section">
                <h4>
                  $ {pageData.price}{" "}
                  <span className="line-through">
                    $ {pageData.price + 20758}
                  </span>
                </h4>
               </div>
              <hr />
            </div>
            <div>
              <h3>Hotel Policies</h3>
              <div className="flex">
                <div>
                  <p>Check in</p>
                  12.00 PM
                </div>
                <div>
                  <p>Check out</p>
                  11.00 AM
                </div>
              </div>
              <ul>
                <li>
                  Guests can check in using any local or outstation ID proof.
                </li>
                <li>
                  As a complimentary benefit, your stay is now insured by Acko.
                </li>
                <li>
                  This hotel is serviced under the trade name of Hotel Aalishan
                  as per quality standards of Radision
                </li>
              </ul>
              <div className="flex redFont policies">
                <p>View Guest Policy</p>
                <p>Find rooms without these rules</p>
              </div>
            </div>
            <div>
              <hr />
              <h3>What's nearby {pageData.name}</h3>
                                         
              <div className="flex map-section">
                <p className="redFont">Place to visit</p>
                <p>Restaurant</p>
                <p>Transport</p>
                <p>Shopping Mall</p>
              </div>
              <div className="flex map">
                <div>
                  <p>Malls</p>
                  <p>Restaurants</p>
                  <p>Parks</p>
                  <p>Railroad Station</p>
                  <p>Airport</p>
                  <p>Pubs</p>
                </div>
              </div>
            </div>
           </div>

          <div className="product-details-child-right-div">
            <div className="detail-page-login flex">
              <img src="/general-Icons/details-login.png" alt="" />
              <p>GET EXCLUSIVE DEALS</p>
              
            </div>
            <div className=" price ">
              <h4>
                $ {pageData.price}{" "}
                <span className="line-through">₹ {pageData.price + 20758}</span>
              </h4>
              <p>inclusive of all taxes</p>
            </div>

            <div className="flex date-div">
              <p>Wed, 13 Oct - Fri, 29 Oct</p>
              <p>1 Room 2 Guests</p>
            </div>
            <div>
              <h5 className="shadow">SPOT ON NON-AC</h5>
            </div>
            <div className="flex coupon-div">
              <div className="flex">
                <img
                  src="/general-Icons/coupon-icon.png"
                  className="coupon-icon"
                  alt=""
                />
                <p>FUSION333 coupon applied</p>
              </div>
              <div className="flex">
                <h6>$ -20</h6>
                <input type="checkbox" className="green" />
              </div>
            </div>
            <div className="more-offers">MORE OFFERS</div>
            <div className="flex">
              <div className="flex wizard-div">
                <p>Save 5% with Radision membership </p>
              </div>
              <div className="flex price-checkbox">
                <p>$30</p>
                <input type="checkbox" />
              </div>
            </div>
            <div className="special-div">
              <div className="flex special-price ">
                <p>Wizard Gold at aspecial price </p>
                <p>+$30</p>
              </div>
              <div className="flex special-price ">
                <p>Get additional benifits upto $100</p>
                <p className="line-through">$30</p>
              </div>
            </div>

            <div className="flex saving">
              <p>Your savings</p>
              <p>$50</p>
            </div>
            <div className="flex saving">
              <p>total price</p>
              <p>$82</p>
            </div>

            <Link to={`/payment/${id}`}>
              <button className="continue-btn">Continue to Book</button>
            </Link>
            <div className="redFont">
              <p>Cancellation Policy</p>
              <p>Follow safety measures advised at the hotel</p>
              <p>By proceeding, you agree to our Guest Policies.</p>
            </div>
          </div>
        </div>
        );
      </>
    </div>
  );
}
