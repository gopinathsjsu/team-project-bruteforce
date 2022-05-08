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
      setTotalAmount(result.data.totalamount);
      setTotalDays(result.data.totaldays);
    });
  };

  const editBooking = (e) => {
    console.log("Edit Booking Page");
    e.preventDefault();
    const fromDateNew = moment(fromDate, "DD-MM-YYYY");
    const toDateNew = moment(toDate, "DD-MM-YYYY");

    const totaldaysa = moment.duration(toDateNew.diff(fromDateNew)).asDays + 1;
    console.log("totaldaysa", totaldaysa);
    setnTotalDays(totaldaysa);
    console.log(ntotalDays, "ntotalDays");
    console.log(totalDays, "totalDays");

    console.log("math", Math.abs(ntotalDays - totalDays) * 100);
    setRemainingAmount(Math.abs(ntotalDays - totalDays) * 100);
    setTotalDays(totaldaysa);
    console.log("remainingAmount", remainingAmount);
    console.log(totaldaysa + " total changed days");
    console.log("Edit bookings " + bookingId);
    Axios.put("http://localhost:4000/api/bookings/editBooking/" + bookingId, {
      fromDate: fromDate,
      toDate: toDate,
      totalDays: totalDays,
      remainingAmount: remainingAmount,
    }).then((result) => {
      console.log(result);
    });
    window.location.href = "/profile";
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
        <div className="section">
          <div className="label">Total Amount</div>
          <input defaultValue={totalAmount} readOnly type="text" />
        </div>
        <div className="section">
          <p>(Note: Pay remaining amount during checkin)</p>
        </div>

        <div className="section">
          <button
            style={{ marginLeft: "25%" }}
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