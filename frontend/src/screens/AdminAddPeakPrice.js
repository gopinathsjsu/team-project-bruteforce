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

  const [name, setName] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [percent, setPercent] = useState();

  const onSubmit = async (values) => {
    values.preventDefault();
    console.log(name);
    console.log(fromDate);
    console.log(toDate);
    console.log(percent);

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
        await axios.post("http://localhost:4000/api/price/addprice", peakValue)
      ).data;
      Swal.fire("Congratulations", "Your Room Added Successfully", "success");
      form.resetFields();
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
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
          <form className="add_price_form">
            <table>
              <tr>
                <td> name </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="from_date">From Date</div>
                </td>
                <td>
                  <DatePicker onChange={handleFromDateChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="from_date">To Date</div>
                </td>
                <td>
                  <DatePicker onChange={handleToDateChange} />
                </td>
              </tr>
              <tr>
                <td> percent </td>
                <td>
                  <input
                    type="number"
                    min={1}
                    max="50"
                    onChange={(e) => setPercent(e.target.value)}
                  ></input>
                </td>
              </tr>
            </table>
            <button onClick={onSubmit}>
              {/* <Button type="danger" htmlType="button" onClick={onReset}> */}
              Add
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
