import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";
import axios from "axios";

import MyBookingScreen from "./MyBookingScreen";
const { TabPane } = Tabs;

function ProfileScreen() {
  // const [userData, setUserData] = useState();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [rewards, setRewards] = useState();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/api/users/getUser/" +
          JSON.parse(localStorage.getItem("currentUser"))._id
      )
      .then((result) => {
        setName(result.data.result[0].name);
        setEmail(result.data.result[0].email);
        setIsAdmin(result.data.result[0].isAdmin);
        setRewards(result.data.result[0].rewards);

        console.log(result.data.result[0].name);
        console.log(result.data.result[0].rewards);
      });
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div className="row">
            <div className="col-xs-12 ml-5 mb-5">
              <div className="bs">
                <p>My Profile</p>
                <p>Name : {name}</p>
                <p>Email : {email}</p>
                <p>
                  IsAdmin :
                  {isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </p>
                <p>Rewards: {rewards}</p>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookingScreen></MyBookingScreen>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;
