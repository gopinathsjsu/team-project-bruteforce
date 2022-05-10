import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
import { format } from "date-fns";

function EditBookings({ match }) {
  const bookingId = match.params.bookingId;
  const [bookingDetails, setBookingDetails] = useState();
  const [roomId, setRoomId] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalDays, setTotalDays] = useState();
  const [remainingAmount, setRemainingAmount] = useState();
  const [ntotalDays, setnTotalDays] = useState(0);
  const [remain, setRemain] = useState(false);

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = () => {
    Axios.get(
      "http://localhost:4000/api/bookings/getSpecificBooking/" + bookingId
    ).then((result) => {
      setBookingDetails(result.data);
      setRoomId(result.data.roomid);
      setFromDate(result.data.fromdate.split("-").reverse().join("-"));
      setToDate(result.data.todate.split("-").reverse().join("-"));
      // setFromDate(result.data.fromdate);
      // setToDate(result.data.todate);
      setTotalAmount(result.data.totalamount);
      setTotalDays(result.data.totaldays);
      setRemainingAmount(result.data.remainingAmount);
    });
  };

  const editBooking = (e) => {
    e.preventDefault();
    //setTotalDays(totaldaysa);
    Axios.put("http://localhost:4000/api/bookings/editBooking/" + bookingId, {
      fromDate: fromDate.split("-").reverse().join("-"),
      toDate: toDate.split("-").reverse().join("-"),
      totalDays: totalDays,
      totalAmount: totalAmount,
      remainingAmount: remainingAmount,
    }).then((result) => {
      getBookingDetails();
      console.log(result);
      //setRemainingAmount(result.remainingAmount);
      setRemain(true);
    });
  };

  return (
    <div>
      <form className="edit_form">
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
          Edit Bookings
        </h1>

        <div className="section">
          <div className="from_date">From Date</div>

          <input
            defaultValue={fromDate}
            type="date"
            disabledDate={(current) =>
              fromDate
                ? current < moment(fromDate, "DD-MM-YYYY") ||
                  current > moment(fromDate, "DD-MM-YYYY").add(7, "day")
                : null
            }
            onChange={(event) => {
              setFromDate(event.target.value);
            }}
          />
        </div>
        <div className="section">
          <div className="to_date">To Date</div>
          <input
            type="date"
            defaultValue={toDate}
            onChange={(event) => {
              setToDate(event.target.value);
            }}
          />
        </div>
        <br></br>
        {/* <div className="section">
          <div className="label">Total Amount</div>
          <input defaultValue={totalAmount} readOnly type="text" />
        </div>
        <div className="section">
          <p>(Note: Pay remaining amount during checkin)</p>
        </div> */}
        <div>{remain && <div>Updated total Amount is {totalAmount}</div>}</div>

        <div className="section">
          <button
            style={{ marginLeft: "25%", border: "none" }}
            className="btn btn-danger"
            onClick={editBooking}
          >
            Confirm Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBookings;
