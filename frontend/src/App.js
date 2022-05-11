import { BrowserRouter, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import LandingScreen from "./screens/LandingScreen";
import EditBookings from "./screens/EditBookings";
// import AdimUpdatePeakPrice from "./screens/AdimUpdatePeakPrice";
import AdminUpdatePeakPriceValue from "./screens/AdminUpdatePeakPriceValue";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={LandingScreen} />
        <Route path="/home" exact component={Homescreen} />
        <Route
          path="/book/:roomid/:fromdate/:todate/:guestCount/:roomCount"
          exact
          component={Bookingscreen}
        />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/profile" exact component={ProfileScreen} />
        <Route path="/bookings" exact component={ProfileScreen} />
        <Route path="/admin" exact component={AdminScreen} />
        <Route
          path="/editBookings/:bookingId/"
          exact
          component={EditBookings}
        />
        <Route
          path="/updatePeakPrice/:id"
          exact
          component={AdminUpdatePeakPriceValue}
        ></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
