import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import AdminUpdatePeakPrice from "./AdminUpdatePeakPriceValue";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AdimUpdatePeakPrice() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const history = useHistory();
  const [idValue, setIdValue] = useState();
  const [showDiscountUpdatePage, setShowDiscountUpdatePage] = useState(false);

  const editPrices = (id) => {
    console.log(id);
    // console.log(price);
    window.location.href = `/updatePeakPrice/${id}`;
  };

  const deletePrices = (id) => {
    console.log(id);
    // console.log(price);
    axios
      .delete("http://localhost:4000/api/price/deleteprice/" + id)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.href = `/admin`;
  };

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.get("http://localhost:4000/api/price/getallpeakprices")
      ).data;
      setPrices(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  var renderPrices = null;
  renderPrices = prices.map((peakPrice) => {
    return (
      <>
        <tr>
          <td>{peakPrice._id}</td>
          <td>{peakPrice.name}</td>
          <td>{peakPrice.fromdate}</td>
          <td>{peakPrice.todate}</td>
          <td>{peakPrice.percent}%</td>
          <td>
            {
              <button
                style={{ border: "none", width: "20%" }}
                className="btn btn-danger"
                onClick={() => {
                  editPrices(peakPrice._id);
                }}
              >
                Edit
              </button>
            }
            {
              <button
                style={{ border: "none", marginLeft: "5%" }}
                className="btn btn-danger"
                onClick={() => {
                  deletePrices(peakPrice._id);
                }}
              >
                Delete
              </button>
            }
          </td>
          {/* <td>{setIdValue(peakPrice._id)}</td> */}
          {/* <td>{idValue}</td> */}
        </tr>
      </>
    );
  });

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <>
          <div className="col md-12">
            <button className="btn btn-success" onClick={fetchMyData}>
              Refresh
            </button>
          </div>
          <div className="col-md-12">
            {/* <Table columns={columns} dataSource={prices} /> */}
            <table className="col-md-12">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Percent</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderPrices}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default AdimUpdatePeakPrice;
