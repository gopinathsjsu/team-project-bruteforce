import React from "react";
import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/loginPage";
import { HotelDetails } from "./HomePage/HotelDetail/HotelDetails";
import { PaymentMain } from "./HomePage/BookingPayment/PaymentMain";
import ProfileForm from "./UserDetails/profileForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hoteldetail/:id" element={<HotelDetails />} />
          <Route path="/payment/:id" element={<PaymentMain />} />
          <Route path="/profile" element={<ProfileForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
