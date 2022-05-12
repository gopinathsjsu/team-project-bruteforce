import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";

import MyBookingScreen from "./MyBookingScreen";
const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-4 mt-3">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div className="row ">
            <div className="col"></div>
            <div className="col align-items-center">
              <div className="bs">
                <h4 style={{ textAlign: "center" }}>MY PROFILE</h4>
                <p style={{ textAlign: "center" }}>Name : {user.name}</p>
                <p style={{ textAlign: "center"} }>Email : {user.email}</p>
                {/* <p>
                  IsAdmin : &nbsp;
                  {user.isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </p> */}
                <p style={{ textAlign: "center" }} >Rewards: {user.rewards}$</p>
              </div>
            </div>
            <div className="col"></div>
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
