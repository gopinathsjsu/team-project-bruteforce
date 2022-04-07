import React from "react";
import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/loginPage";
import { HotelDetails } from "./HomePage/HotelDetail/HotelDetails";
import { PaymentMain } from "./HomePage/BookingPayment/PaymentMain";
import { HotelOptions } from "./HomePage/HotelOptions";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<HotelOptions />} /> */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/hotels" element={<HotelOptions />} />

          <Route path="/hoteldetail/:id" element={<HotelDetails />} />
          <Route path="/payment/:id" element={<PaymentMain />} />
          {/* <Route path="/profile" element={<ProfileForm />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
