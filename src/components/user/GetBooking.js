import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
//context
import userContext from "../../context/userContext";
//components
import Header from "../front/Header";
import Sidebar from "./Sidebar";
import Popup from "./Popup";
import Loading from "../front/Loading";
import Login from "../front/Login";
import media from "../front/Media";
//constants
import { DELETE } from "../front/Constants";

const GetBooking = () => {
  //context
  const { userData } = useContext(userContext);
  //state
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState();
  const history = useHistory();
  const [popUp, setPopUp] = useState({
    toggle: false,
    name: undefined,
    id: undefined,
    mode: undefined,
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  //handlers
  const deleteHandler = () => {
    setPopUp({
      toggle: !popUp.toggle,
      name: booking.userInfo[0].answer,
      id: booking._id,
      mode: DELETE,
    });
  };

  //API calls
  useEffect(() => {
    let path = window.location.pathname;
    if (path.slice(-1) === "/") path = path.slice(0, -1);

    let booking_id = { id: path.substring(path.lastIndexOf("/") + 1) };
    if (booking_id.id === "getbooking") history.push("/mybookings");
    try {
      const getBookingData = async () => {
        const bookingData = await axios.post(
          "https://book-me-project.herokuapp.com/bookings/getBooking",
          booking_id
        );
        setBooking(bookingData.data);
      };
      getBookingData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {!loading ? (
        userData.user ? (
          <>
            <Header />
            <Sidebar />
            <Popup
              display={popUp.toggle}
              name={popUp.name}
              type="booking"
              id={popUp.id}
              mode={popUp.mode}
            />
            {booking && (
              <Container>
                <Info>
                  <p>Calendar : </p>
                  <p>{booking.calendar}</p>
                </Info>
                <Info>
                  <p>Name : </p>
                  <p>{booking.userInfo[0].answer}</p>
                </Info>
                <Info>
                  <p>Email : </p>
                  <p>{booking.userInfo[1].answer}</p>
                </Info>
                <Info>
                  <p>Phone Number : </p>
                  <p>{booking.userInfo[2].answer}</p>
                </Info>
                <Info>
                  <p>Date : </p>
                  <p>{new Date(booking.date).toLocaleDateString()}</p>
                </Info>
                <Info>
                  <p>Time : </p>
                  <p>{booking.time}</p>
                </Info>
                <Info>
                  <p>Duration : </p>
                  <p>{booking.duration} min</p>
                </Info>
              </Container>
            )}
            <Buttons>
              <button onClick={deleteHandler}>delete</button>
              <button id="back" onClick={() => history.push("/dashboard")}>
                back
              </button>
            </Buttons>
          </>
        ) : (
          <Login />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default GetBooking;

const Info = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 14px;
  }
`;

const Buttons = styled.div`
  width: 650px;
  margin: 0 auto;
  padding: 20px 0;
  ${media.small`
   width : 90%;
   `}
  button {
    float: right;
    margin: 0 10px;
    cursor: pointer;
    background-color: #33475b;
    color: white;
    width: 150px;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    border: solid 1px #33475b;

    ${media.small`
   width : auto;
   padding : 5px 20px;
   `}
    &:hover {
      color: #33475b;
      background-color: white;
    }
  }
  #back {
    float: left;
  }
`;

const Container = styled.div`
  border: solid 1px #33475b;
  width: 650px;
  background-color: white;
  margin: 0 auto;

  ${media.small`
   width : 90%;
   `}
  > div:nth-child(even) {
    background-color: #f0f0f0;
  }
`;
