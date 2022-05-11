import React, { useState, useEffect } from "react";
import axios from "axios";
import moment, { max } from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "../App.css";
import { amenities } from "../components/Amenities";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

function Bookingscreen({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [useRewards, setUseRewards] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amenitiesAmount, setAmenitiesAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [checkedState, setCheckedState] = useState(
    new Array(amenities.length).fill(false)
  );
  const [newtotal, setnewtotal] = useState("");
  const [offer, setnewOffer] = useState("");
  const [extra, setExtra] = useState("");
  const [display, setDisplay] = useState(false);

  const [rewards, setRewards] = useState();

  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + amenities[index].price;
        }
        return sum;
      },
      0
    );
    const totalPriceForAmenities = totalPrice * totalDays;
    setAmenitiesAmount(totalPriceForAmenities);
    setDisplay(false);
  };

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");
  const guestCount = match.params.guestCount;
  const roomCount = match.params.roomCount;

  const handleCheck = (event) => {
    var updatedList = [...amenitiesList];
    if (event.target.checked) {
      updatedList = [...amenitiesList, event.target.value];
    } else {
      updatedList.splice(amenitiesList.indexOf(event.target.value), 1);
    }
    setAmenitiesList(updatedList);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      window.location.href = "/login";
    }
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (
          await axios.post("http://localhost:4000/api/rooms/getroombyid", {
            roomid: match.params.roomid,
          })
        ).data;
        console.log(data);
        setRoom(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    setTotalDays(totaldays);
    const roomrent = totalDays * room.rentperday;

    setTotalAmount(roomrent);
  }, [room]);

  const handleUseReedem = () => {
    console.log(useRewards);
    setDisplay(false);

    setUseRewards(!useRewards);
    console.log(useRewards + "====================");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user.rewards);
    console.log(rewards);

    if (useRewards) {
      console.log(rewards + "===========================");
      setTotalAmount(totalAmount - user.rewards);
      setRewards(0);

      // JSON.parse(localStorage.getItem("currentUser"))._id;
    } else {
      setRewards(user.rewards);
      setTotalAmount(totalAmount + user.rewards);
    }
  };

  const handlePrice = async () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      guestCount,
      totalAmount: totalAmount + amenitiesAmount,
      totaldays: totalDays,
      remainingAmount: room.rentperday,
      extracostapplied: "",
      offerapplied: "",
    };

    axios
      .post("http://localhost:4000/api/bookings/getprice", bookingDetails)
      .then((result) => {
        console.log(result);

        var newRoomCost = 0;
        if (guestCount > 2) {
          newRoomCost = result.data.totalAmount + (guestCount - 2) * 15;
          if (roomCount > 1) {
            newRoomCost = newRoomCost * roomCount;
          }
        } else {
          newRoomCost = result.data.totalAmount;
          if (roomCount > 1) {
            newRoomCost = newRoomCost * roomCount;
          }
        }

        setnewtotal(newRoomCost);
        setnewOffer(result.data.offerapplied);
        setExtra(result.data.extracostapplied);
        setDisplay(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBooking = async () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      guestCount,
      totalAmount: newtotal,
      totaldays: totalDays,
      remainingAmount: room.rentperday,
      extracostapplied: "extra cost",
      offerapplied: "offer",
    };

    try {
      setLoading(true);
      const result = await axios.post(
        "http://localhost:4000/api/bookings/bookroom",
        bookingDetails
      );
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          setIsRoomBooked(true);
          if (rewards === 0) {
            const result = axios
              .put(
                "http://localhost:4000/api/users/updateUserRewards/" +
                  JSON.parse(localStorage.getItem("currentUser"))._id
              )
              .then((userRes) => {
                setIsRoomBooked(true);
                console.log(userRes);
                const user = JSON.parse(localStorage.getItem("currentUser"));
                user.rewards = 0;
                console.log(JSON.stringify(user));
                localStorage.setItem("currentUser", JSON.stringify(user));
              })
              .catch((error) => {
                console.log(error);
              });
            // window.location.href = "/home";
          } else {
            window.location.href = "/home";
          }
        }
        window.location.href = "/bookings";
      });
    } catch (error) {
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
    //TESTING CARD
    //https://stripe.com/docs/testing
    //https://www.npmjs.com/package/react-stripe-checkout
    // fetch("/save-stripe-token", {
    //   method: "POST",
    //   body: JSON.stringify(token),
    // }).then((response) => {
    //   response.json().then((data) => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  };

  if (isRoomBooked) {
    // code of decreasing room count
    console.log("In axios room count ========================");
    console.log(match.params.roomCount);
    console.log(room.maxcount);
    const totalRooms = room.maxcount - match.params.roomCount;
    console.log(totalRooms);
    console.log(room._id);
    axios
      .put("http://localhost:4000/api/rooms/updateRoom/" + room._id, {
        totalRooms,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="col">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="row justify-content-center mt-5 bs">
          <div className="col">
            <h1 style={{ color: "rgb(144 92 15)", fontWeight: "bold" }}>
              {room.name}
            </h1>
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          <div className="col">
            <div style={{ textAlign: "right" }}>
              <h1>
                <u>Booking Details</u>
              </h1>
              <hr />
              <b>
                <p>
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>From Date : {match.params.fromdate}</p>
                <p>To Date : {match.params.todate}</p>
                <p>Max Count : {room.maxcount}</p>
                <p>Guest Count: {match.params.guestCount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1>
                <u>Amenities</u>
              </h1>
              <hr />
              <div className="col">
                <ul>
                  {amenities.map(({ name, price }, index) => {
                    return (
                      <li key={index}>
                        <div className="amenities">
                          <div
                            className="amenities-items"
                            style={{
                              width: "20px",
                              marginLeft: "100%",
                              marginBottom: "-35px",
                            }}
                          >
                            <input
                              type="checkbox"
                              id={`custom-checkbox-${index}`}
                              name={name}
                              value={name}
                              checked={checkedState[index]}
                              onChange={() => handleOnChange(index)}
                            />
                          </div>
                          <p
                            style={{ marginRight: "15px" }}
                            htmlFor={`custom-checkbox-${index}`}
                          >
                            {name} ({getFormattedPrice(price)})
                          </p>
                          <p className="amenities-items"></p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1>
                <u>Amount</u>
              </h1>
              <hr />
              <b>
                <p>Total Days : {totalDays}</p>
                <p>Rent per day : {room.rentperday}</p>

                {JSON.parse(localStorage.getItem("currentUser")).rewards !==
                0 ? (
                  <>
                    <p style={{ marginRight: "4%" }}>Use Rewards</p>

                    <div
                      className="amenities-items"
                      style={{
                        width: "20px",
                        marginLeft: "97%",
                        marginTop: "-45px",
                        // position: "relative",
                      }}
                    >
                      <div>
                        <input type="checkbox" onChange={handleUseReedem} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: "10px", color: "red" }}>
                      **You used all your rewards
                    </div>
                  </>
                )}

                {/* <p>Total Amount : {Number(totalAmount + amenitiesAmount)}</p> */}

                <button onClick={handlePrice} className="btn btn-primary">
                  Check Updated Price
                </button>
                {display && (
                  <div>
                    Guest Cost:
                    <br></br>
                    Updated Cost: {newtotal}
                    <br></br>
                    {offer}
                    <br></br>
                    {extra}
                  </div>
                )}
              </b>
            </div>
            <div
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px",
                marginLeft: "51%",
                // backgroundColor: "yellow",
              }}
            >
              **Once room booked you can't edit amenities
            </div>

            <div style={{ float: "right" }}>
              {/* <StripeCheckout
                amount={totalAmount * 100}
                currency="USD"
                token={onToken}
                stripeKey="YOUR PUBLIC STRIP API KEY"
              ></StripeCheckout> */}

              {display && (
                <button onClick={handleBooking} className="btn btn-primary">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
