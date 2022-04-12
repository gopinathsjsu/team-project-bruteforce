import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";

function EditBookings({ match }) {
  const bookingId = match.params.bookingId;
  const [bookingDetails, setBookingDetails] = useState();
  const [roomId, setRoomId] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalDays, setTotalDays] = useState();

  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = () => {
    Axios.get(
      "http://localhost:4000/api/bookings/getSpecificBooking/" + bookingId
    ).then((result) => {
      console.log(result.data);
      console.log(result.data.totaldays);
      setBookingDetails(result.data);
      setRoomId(result.data.roomid);
      setFromDate(result.data.fromdate);
      setToDate(result.data.todate);
      setTotalAmount(result.data.totalamount);
      setTotalDays(result.data.totaldays);
    });
  };

  const dateFunction = (specifiedDate) => {
    if (specifiedDate === "null") {
      //   return moment(match.params.fromdate, "DD-MM-YYYY");
    } else {
      //   return moment(match.params.fromdate, "DD-MM-YYYY");
    }
  };
  return (
    <div>
      <form className="edit_form">
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
          Edit Bookings
        </h1>

        <div className="section">
          <div className="label">From Date</div>
          <input
            defaultValue={dateFunction(fromDate)}
            type="date"
            onChange={(event) => {
              setFromDate(event.target.value);
            }}
          />
        </div>
        <div className="section">
          <div className="label">To Date</div>
          <input
            defaultValue={dateFunction(fromDate)}
            type="date"
            onChange={(event) => {
              setFromDate(event.target.value);
            }}
          />
        </div>
        <div className="section">
          <div className="label">Total Amount</div>
          <input defaultValue={totalAmount} readOnly type="text" />
        </div>

        <div className="section">
          <button
            style={{ marginLeft: "25%" }}
            className="btn btn-danger"
            onClick={() => {
              // cancelBooking(booking._id, booking.roomid);
            }}
          >
            Confirm Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBookings;
