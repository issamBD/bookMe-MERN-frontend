import { useState, useEffect } from "react";
import CreateTool from "./components/user/CreateTool";
import Home from "./components/front/Home";
import Login from "./components/front/Login";
import Register from "./components/front/Register";
import Booking from "./components/costumer/Booking";
import MyBookings from "./components/user/MyBookings";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "./context/userContext";
import BookingContext from "./context/bookingContext";
import GlobalStyle from "./components/front/GlobalStyle";
import Success from "./components/costumer/Success";
import Dashboard from "./components/user/Dashboard";
import MyTools from "./components/user/MyTools";
import axios from "axios";
import Tool from "./components/user/Tool";
import getBooking from "./components/user/GetBooking";

function App() {
  const [userData, setUserdata] = useState({
    token: undefined,
    user: undefined,
  });
  const [bookingData, setBookingData] = useState({
    booking: undefined,
    displayedName: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "https://book-me-project.herokuapp.com/users/validateToken",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(
          "https://book-me-project.herokuapp.com/users/",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserdata({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <BookingContext.Provider value={{ bookingData, setBookingData }}>
          <UserContext.Provider value={{ userData, setUserdata }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/createTool" component={CreateTool} />
              <Route path="/booking" component={Booking} />
              <Route path="/mybookings" component={MyBookings} />
              <Route path="/mytools" component={MyTools} />
              <Route path="/success" component={Success} />
              <Route path="/tool" component={Tool} />
              <Route path="/getbooking" component={getBooking} />
            </Switch>
          </UserContext.Provider>
        </BookingContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
