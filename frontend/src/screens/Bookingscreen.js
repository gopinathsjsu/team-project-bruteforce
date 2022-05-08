import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
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

  const [rewards, setRewards] = useState();

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
    setAmenitiesAmount(totalPrice);
  };

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");

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

  const handleBooking = async () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount: totalAmount + amenitiesAmount,
      totaldays: totalDays,
      remainingAmount: room.rentperday
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
          console.log(result + "--------------------------");
          // window.location.href = "/home";
          // const user = JSON.parse(localStorage.getItem("currentUser"));

          console.log(
            JSON.parse(localStorage.getItem("currentUser"))._id +
              "=====================user id "
          );
          console.log(
            JSON.parse(localStorage.getItem("currentUser")).rewards +
              "=====================user id "
          );
          if (rewards === 0) {
            const result = axios
              .put(
                "http://localhost:4000/api/users/updateUserRewards/" +
                  JSON.parse(localStorage.getItem("currentUser"))._id
              )
              .then((userRes) => {
                console.log(userRes);
                const user = JSON.parse(localStorage.getItem("currentUser"));
                user.rewards = 0;
                console.log(
                  "/////////////////////////////////////////" + user.rewards
                );
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
                              position: "relative",
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
                          <label htmlFor={`custom-checkbox-${index}`}>
                            {name}
                          </label>
                          <div className="amenities-items">
                            {getFormattedPrice(price)}
                          </div>
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
                <p>Total Amount : {Number(totalAmount + amenitiesAmount)}</p>
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

              <button onClick={handleBooking} className="btn btn-primary">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
