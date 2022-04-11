import React from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import HotelsByLocation from "./HotelsByLocation";

function Home() {
  return (
    <>
      <Navbar />
      <hr />
      <Dashboard />
      {/* <HotelsByLocation /> */}
      <Footer />
    </>
  );
}

export default Home;
