import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";
import Axios from "axios";

function AdminUpdatePeakPriceValue({ match }) {
  const priceId = match.params.id;

  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const [name, setName] = useState("");
  const [percent, setPercent] = useState();

  useEffect(() => {
    if (!user || user.isAdmin === false) {
    }
    Axios.get("http://localhost:4000/api/price/getpricesbyid/" + priceId).then(
      (result) => {
        console.log(" ==================== in get by id =================");
        console.log(result.data[0].percent);
        setName(result.data[0].name);
        setFromDate(result.data[0].fromdate);
        setToDate(result.data[0].todate);
        setPercent(result.data[0].percent);
      }
    );
  }, []);

  const editDiscount = (e) => {
    e.preventDefault();
    //setTotalDays(totaldaysa);
    Axios.put("http://localhost:4000/api/price/editDiscount/" + priceId, {
      fromDate: fromDate,
      toDate: toDate,
      percent: percent,
    }).then((result) => {
      console.log(result);
      window.location.href = "/admin";
    });
  };

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
          <input type="text" readOnly defaultValue={name} />
        </div>

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
            defaultValue={percent}
            min={1}
            max={50}
            // value={fromDate ? moment(fromDate, "DD-MM-YYYY") : null}
            onChange={(e) => {
              setPercent(e.target.value);
            }}
          />
        </div>

        <div className="section">
          <button
            style={{ width: "100%", border: "none" }}
            className="btn btn-danger"
            onClick={editDiscount}
          >
            Confirm Edit
          </button>
        </div>
      </form>
    </>
  );
}

export default AdminUpdatePeakPriceValue;
