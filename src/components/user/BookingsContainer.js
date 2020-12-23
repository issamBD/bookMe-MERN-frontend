import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//context
import userContext from "../../context/userContext";
//components
import Popup from "./Popup";
import media from "../front/Media";
//constants
import { DELETE } from "../front/Constants";

const BookingsContainer = () => {
  //context
  const { userData } = useContext(userContext);
  //states
  const [bookings, setBookings] = useState(null);
  const [popUp, setPopUp] = useState({
    toggle: false,
    name: undefined,
    id: undefined,
    mode: undefined,
  });
  //history
  const history = useHistory();
  //handlers
  const deleteHandler = (booking) => {
    setPopUp({
      toggle: !popUp.toggle,
      name: booking.userInfo[0].answer,
      id: booking._id,
      mode: DELETE,
    });
  };

  //API calls
  useEffect(() => {
    if (userData.user) {
      const user = { user_id: userData.user.id };
      try {
        const getBookings = async () => {
          const allBookings = await axios.post(
            "https://book-me-project.herokuapp.com/bookings/all",
            user
          );
          if (allBookings.data.lenght > 1) {
            allBookings.data.sort(
              (a, b) =>
                parseFloat(new Date(b.date).getTime()) -
                parseFloat(new Date(a.date).getTime())
            );
          }
          setBookings(allBookings.data);
        };
        getBookings();
      } catch (error) {
        console.log(error);
      }
    }
  }, [userData]);

  return (
    <div>
      <Heading>
        <p id="nameTag">Costumer</p>
        <p className="date">Date</p>
        <p className="button">Action</p>
      </Heading>
      <Frame>
        <Popup
          display={popUp.toggle}
          name={popUp.name}
          type="booking"
          id={popUp.id}
          mode={popUp.mode}
        />

        {bookings &&
          bookings.map((booking) => {
            if (booking) {
              return (
                <Booking key={uuid()}>
                  <Link className="name" to={`/getbooking/${booking._id}`}>
                    <p>{booking.userInfo[0].answer}</p>
                  </Link>{" "}
                  <p className="date">
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <div className="button">
                    <button
                      onClick={() => history.push(`/getbooking/${booking._id}`)}
                    >
                      view
                    </button>
                    <button
                      onClick={() => {
                        deleteHandler(booking);
                      }}
                    >
                      delete
                    </button>
                  </div>{" "}
                </Booking>
              );
            }
          })}
      </Frame>
    </div>
  );
};

export default BookingsContainer;

const Booking = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0 20px;

  .name {
    flex-basis: 150px;
    cursor: pointer;
    text-decoration: none;
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 12px;

    &:hover {
      text-decoration: underline;
    }
  }
  .button {
    flex-basis: 150px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const Frame = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: 650px;
  border: solid 1px black;
  div:nth-child(even) {
    background-color: #f0f0f0;
  }
  .date {
    flex-basis: 180px;
    text-align: center;
  }
  ${media.small`
     width: 90%;
   `}
`;

const Heading = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 650px;
  margin: 0 auto;
  //background-color: red;
  margin: 20px auto 10px auto;
  #nameTag {
    flex-basis: 150px;
  }
  .date {
    flex-basis: 180px;
    text-align: center;
  }
  .button {
    flex-basis: 150px;
    text-align: center;
  }
  ${media.small`
     width: 90%;
   `}
`;
