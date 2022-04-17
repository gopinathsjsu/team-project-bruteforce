import React from "react";
import Home from "./HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/loginPage";
import HotelsList from "./HotelsListPage/HotelsList";
// import { HotelDetails } from "./HomePage/HotelDetail/HotelDetails";
// import { PaymentMain } from "./HomePage/BookingPayment/PaymentMain";
// import { HotelOptions } from "./HomePage/HotelOptions";
// import StayHistory from "./HomePage/StayHistory";
// import ProfileForm from "./UserDetails/profileForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HotelsList />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/hotels" element={<LoginPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
