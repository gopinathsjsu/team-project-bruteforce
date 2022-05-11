import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";

function AdminUpdatePeakPriceValue() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    if (!user || user.isAdmin == false) {
      window.location.href = "/home";
    }
  }, []);

  const handleFromDateChange = (date) => {
    setFromDate(date ? moment(date).format("DD-MM-YYYY") : null);
  };

  const handleToDateChange = (date) => {
    setToDate(date ? moment(date).format("DD-MM-YYYY") : null);
  };

  return (
    <>
      <form className="edit_form">
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>
          Edit Bookings
        </h1>
        <div className="section">
          <div className="from_date">Name</div>
          <input
            type="text"
            readOnly
            // defaultValue={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            // value={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
          />
        </div>

        <div className="section">
          <div className="from_date">From Date</div>
          <DatePicker
            // defaultValue={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            // value={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            onChange={handleFromDateChange}
          />
        </div>
        <div className="section">
          <div className="to_date">To Date</div>
          <DatePicker
            // defaultValue={toDate ? moment(toDate, "DD-MM-YYYY") : null}
            // value={toDate ? moment(toDate, "DD-MM-YYYY") : null}
            onChange={handleToDateChange}
            // disabledDate={(current) =>
            //   fromDate
            //     ? current < moment(fromDate, "DD-MM-YYYY") ||
            //       current > moment(fromDate, "DD-MM-YYYY").add(7, "day")
            //     : null
            // }
          />
        </div>

        <div className="section">
          <div className="from_date">Discount (%)</div>
          <input
            type="number"
            defaultValue="0"
            // defaultValue={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            // value={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            // onChange={handleFromDateChange}
          />
        </div>

        <div className="section">
          <button
            style={{ width: "100%", border: "none" }}
            className="btn btn-danger"
            // onClick={editBooking}
          >
            Confirm Edit
          </button>
        </div>
      </form>
    </>
  );
}

export default AdminUpdatePeakPriceValue;
