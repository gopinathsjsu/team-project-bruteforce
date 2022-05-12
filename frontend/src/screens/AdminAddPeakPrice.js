import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import axios from "axios";
import moment from "moment";
import { Form, Input, InputNumber, Button, Select } from "antd";

import Swal from "sweetalert2";

import Loader from "../components/Loader";
import Error from "../components/Error";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function AdminAddPeakPrice() {
  const { Option } = Select;

  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form] = Form.useForm();

  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [percent, setPercent] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const onSubmit = async (values) => {
    values.preventDefault();
    console.log(name);
    console.log(fromDate);
    console.log(toDate);
    console.log(percent);

    if (name === "" || fromDate === "" || toDate === "" || percent === "") {
      console.log("Enter name of the holiday");
      setErrorValue("Please enter all the fields");
    } else {
      const peakValue = {
        name: name,
        fromdate: fromDate,
        todate: toDate,
        percent: percent,
      };

      setError("");
      setLoading(true);
      try {
        const data = (
          await axios.post(
            "http://202loadbalancer-1845045619.us-east-2.elb.amazonaws.com:4000/api/price/addprice",
            peakValue
          )
        ).data;
        Swal.fire("Congratulations", "Your Room Added Successfully", "success");
        form.resetFields();
      } catch (error) {
        console.log(error);
        setError(error);
        Swal.fire("Opps", "Error:" + error, "error");
      }
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleFromDateChange = (date) => {
    setFromDate(date ? moment(date).format("DD-MM-YYYY") : null);
    // setToDate(null);
  };

  const handleToDateChange = (date) => {
    setToDate(date ? moment(date).format("DD-MM-YYYY") : null);
    // setToDate(null);
  };

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          {errorValue.length > 0 && (
            <div style={{ marginLeft: "25%", color: "red", fontSize: "20px" }}>
              {errorValue}
            </div>
          )}
          <form className="add_price_form">
            <table className="add_price_table">
              <tr>
                <td> name </td>
                <td className="price_input">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                  ></input>
                </td>
              </tr>
              <br></br>

              <tr>
                <td>
                  <div className="from_date">From Date</div>
                </td>
                <td className="price_inputd">
                  <DatePicker onChange={handleFromDateChange} required />
                </td>
              </tr>
              <br></br>
              <tr>
                <td>
                  <div className="from_date">To Date</div>
                </td>
                <td className="price_inputd">
                  <DatePicker
                    onChange={handleToDateChange}
                    required
                    disabledDate={(current) =>
                      fromDate
                        ? current < moment(fromDate, "DD-MM-YYYY") ||
                          current >
                            moment(fromDate, "DD-MM-YYYY").add(15, "day")
                        : null
                    }
                  />
                </td>
              </tr>
              <br></br>

              <tr>
                <td> percent </td>
                <td className="price_input">
                  <input
                    required={true}
                    type="number"
                    min={1}
                    max="50"
                    onChange={(e) => setPercent(e.target.value)}
                  ></input>
                </td>
              </tr>
              <br></br>
            </table>
            <button
              style={{ marginLeft: "25%", border: "1px solid transparent" }}
              onClick={onSubmit}
            >
              {/* <Button type="danger" htmlType="button" onClick={onReset}> */}
              Add
              {/* </Button> */}
            </button>
            <button
              style={{
                backgroundColor: "#ff4d4f",
                border: "1px solid #ff4d4f",
              }}
              onClick={onSubmit}
            >
              {/* <Button type="danger" htmlType="button" onClick={onReset}> */}
              Update
              {/* </Button> */}
            </button>
          </form>
          {/* <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="success" htmlType="submit">
                Add
              </Button>
              <Button type="danger" htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form> */}
        </div>
      )}
    </div>
  );
}

export default AdminAddPeakPrice;
