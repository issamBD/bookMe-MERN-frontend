import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import uuid from "react-uuid";
//context
import userContext from "../../context/userContext";
//components
import media from "../front/Media";
//constants
import { DAYS_OF_THE_WEEK_LONG, MONTHS } from "../front/Constants";

const Summary = () => {
  //context
  const { userData } = useContext(userContext);
  //state
  const [bookingsNumber, setBookingsNumber] = useState(0);
  const [toolsNumber, setToolsNumber] = useState(0);
  const [upcoming, setUpcoming] = useState([]);

  //functions
  const dateString = (date) => {
    date = new Date(date);
    let dd = DAYS_OF_THE_WEEK_LONG[date.getDay()];
    let mm = MONTHS[date.getMonth()];
    let yyyy = date.getFullYear();
    date = dd + ", " + mm + " " + date.getDate() + ", " + yyyy;
    return date;
  };

  //api calls
  useEffect(() => {
    const getNumbers = async () => {
      try {
        const user = {
          user_id: userData.user.id,
        };
        const bookingsNumber = await axios.post(
          "https://book-me-project.herokuapp.com/bookings/getNumber",
          user
        );
        const toolsNumber = await axios.post(
          "https://book-me-project.herokuapp.com/tools/getNumber",
          user
        );
        const allBookings = await axios.post(
          "https://book-me-project.herokuapp.com/bookings/all",
          user
        );

        if (allBookings.data.lenght > 1) {
          allBookings.data.sort(
            (a, b) =>
              parseFloat(new Date(a.date).getTime()) -
              parseFloat(new Date(b.date).getTime())
          );
        }
        let upComingDates = allBookings.data;
        if (upComingDates.lenght > 3) upComingDates.slice(2);
        upComingDates.map((data) => {
          data.date = dateString(data.date);
          return data.date;
        });
        setBookingsNumber(bookingsNumber.data.number);
        setToolsNumber(toolsNumber.data.number);
        setUpcoming(upComingDates);
      } catch (error) {
        console.log(error);
      }
    };
    getNumbers();
  }, [userData]);

  return (
    <Frame>
      <Numbers>
        <Section>
          <h1>{bookingsNumber}</h1>
          <p>Bookings</p>
        </Section>
        <Section>
          <h1>{toolsNumber}</h1>
          <p>Tools</p>
        </Section>
      </Numbers>
      <NextBoooking>
        <h3>Upcoming bookings</h3>
        {upcoming.map((data) => {
          return <span key={uuid()}>{data.date}</span>;
        })}
      </NextBoooking>
    </Frame>
  );
};

export default Summary;

const Frame = styled.div`
  width: 660px;
  margin: 50px auto 80px auto;
  color: white;
  display: flex;
  justify-content: space-around;
  position: relative;
  ${media.small`
     width: 90%;
     flex-direction : column;
     margin-bottom : 40px;
   `}
`;

const Section = styled.div`
  cursor: pointer;
  position: relative;
  background-color: #33475b;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;

  p {
    position: absolute;
    bottom: -30px;
    color: #33475b;
    ${media.small`
    bottom: -20px;
font-size : 14px;
   `}
  }
  ${media.small`
   margin : 0 20px;
   `}
`;

const Numbers = styled.div`
  width: 330px;
  display: flex;
  justify-content: space-around;
  ${media.small`
   width : 90%;
   justify-content: center;
   `}
`;

const NextBoooking = styled.div`
  text-align: center;
  color: #33475b;
  h3 {
    margin: 0 auto 15px auto;
  }
  span {
    font-size: 14px;
    cursor: pointer;
    display: block;
    margin: 8px 0;
    text-align: left;
    ${media.small`
    text-align: center;

   `}
  }
  ${media.small`
    margin-top : 50px;
    margin-bottom : 0;
 width : 90%;
   `}
`;
