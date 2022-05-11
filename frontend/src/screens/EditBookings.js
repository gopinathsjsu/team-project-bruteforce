import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
import { DatePicker, Space } from "antd";
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
      setFromDate(result.data.fromdate);
      setToDate(result.data.todate);

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
      fromDate: fromDate,
      toDate: toDate,
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

  const handleFromDateChange = (date) => {
    setFromDate(date ? moment(date).format("DD-MM-YYYY") : null);
    setToDate(null);
  };

  const handleToDateChange = (date) => {
    setToDate(date ? moment(date).format("DD-MM-YYYY") : null);
  };

  return (
    <div>
      <form className="edit_form">
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
          Edit Bookings
        </h1>

        <div className="section">
          <div className="from_date">From Date</div>
          <DatePicker
            defaultValue={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            value={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            onChange={handleFromDateChange}
          />
        </div>
        <div className="section">
          <div className="to_date">To Date</div>
          <DatePicker
            defaultValue={toDate ? moment(toDate, "DD-MM-YYYY") : null}
            value={toDate ? moment(toDate, "DD-MM-YYYY") : null}
            onChange={handleToDateChange}
            disabledDate={(current) =>
              fromDate
                ? current < moment(fromDate, "DD-MM-YYYY") ||
                  current > moment(fromDate, "DD-MM-YYYY").add(7, "day")
                : null
            }
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
            style={{ width: "100%", border: "none" }}
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
