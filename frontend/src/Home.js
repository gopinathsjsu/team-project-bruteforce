import React, { useState } from "react";
import Axios from "axios";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  

  const image1 =
    "https://upload.wikimedia.org/wikipedia/commons/6/63/Pie-chart.jpg";
  const image2 =
    "https://upload.wikimedia.org/wikipedia/commons/6/63/Pie-chart.jpg";

  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {/* <Dashboard /> */}
      {/* <h1> Dashboard </h1> */}
      {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
        <img src={image1} alt={"image"} width={500} height={500} />
        <img src={image2} alt={"image"} width={500} height={500} />
      </div> */}
      <Footer />
    </>
  );
}

export default Home;
