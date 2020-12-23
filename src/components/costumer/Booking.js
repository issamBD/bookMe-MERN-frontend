import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
//context
import bookingContext from "../../context/bookingContext";
//components
import Calendar from "./Calendar";
import Time from "./Time";
import Form from "./Form";
import Error from "../front/Error";
import media from "../front/Media";
//constants
import { DAYS_OF_THE_WEEK_LONG, MONTHS } from "../front/Constants";

const Booking = () => {
  //states
  const [date, setDate] = useState(new Date());
  const [tool, setTool] = useState();
  const [selected, setSelected] = useState();
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formValidated, setformValidated] = useState(false);
  const [answered, setAnswered] = useState();
  const [error, setError] = useState();

  //context
  const { setBookingData } = useContext(bookingContext);

  //history
  const history = useHistory();

  useEffect(() => {
    if (formValidated) submit();
  }, [formValidated]);

  useEffect(() => {
    let path = window.location.pathname;
    if (path.slice(-1) === "/") path = path.slice(0, -1);
    let tool_id = { id: path.substring(path.lastIndexOf("/") + 1) };
    try {
      const getToolData = async () => {
        const toolData = await axios.post(
          "https://book-me-project.herokuapp.com/bookings/getCalendar",
          tool_id
        );
        setTool(toolData.data);
        if (!toolData.data.status)
          setError("This calendar is currenctly inactive");
      };
      getToolData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (tool) {
      setSelected(new Date(tool.periods[0]));
    }
  }, [tool]);

  //functions
  const choiceString = (date) => {
    date = new Date(date);
    let dd = DAYS_OF_THE_WEEK_LONG[date.getDay()];
    let mm = MONTHS[date.getMonth()];
    let yyyy = date.getFullYear();
    date = dd + ", " + mm + " " + date.getDate() + ", " + yyyy;
    return date + " at " + time + " for " + duration + " min";
  };

  const getAvailableDays = () => {
    let array = [];
    for (let i of tool.hours) array.push(DAYS_OF_THE_WEEK_LONG.indexOf(i.day));
    return array;
  };

  const submit = async () => {
    let path = window.location.pathname;
    if (path.slice(-1) === "/") path = path.slice(0, -1);
    let tool_id = path.substring(path.lastIndexOf("/") + 1);
    const newBooking = {
      tool_id,
      date: selected,
      time,
      duration,
      userInfo: answered,
    };
    try {
      const saved = await axios.post(
        "https://book-me-project.herokuapp.com/bookings/create",
        newBooking
      );
      if (saved) history.push("/success");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
      setformValidated(false);
    }
  };

  const getHours = () => {
    const day = DAYS_OF_THE_WEEK_LONG[date.getDay()];
    let temp = null;
    for (let i of tool.hours) {
      if (i.day === day) temp = i.hours;
    }
    return temp;
  };

  //handlers
  const inputValidation = () => {
    if (selected && time && duration) {
      setBookingData({
        booking: choiceString(selected),
        displayedName: tool.username,
      });
      setBookingSubmitted(true);
    } else {
      setError("Please choose a valid booking");
    }
  };

  return (
    <div>
      {tool && tool.status && (
        <Container>
          <h1>Book an appointment width {tool.username}</h1>
          <div>
            {error && <Error error={error} setError={setError} />}

            <StyledBooking bookingSubmitted={bookingSubmitted}>
              <Calendar
                date={date}
                setDate={setDate}
                selected={selected}
                setSelected={setSelected}
                availibility={tool.periods}
                setTime={setTime}
                availableDays={getAvailableDays()}
              />
              <Time
                time={time}
                setTime={setTime}
                duration={duration}
                setDuration={setDuration}
                durations={tool.durations}
                hours={getHours()}
              />
              <StyledButton onClick={inputValidation}>Next</StyledButton>
            </StyledBooking>
            <Form
              questions={tool.questions}
              bookingSubmitted={bookingSubmitted}
              setformValidated={setformValidated}
              answered={answered}
              setAnswered={setAnswered}
              costumerChoice={choiceString(selected)}
              setBookingSubmitted={setBookingSubmitted}
            />
          </div>
        </Container>
      )}
    </div>
  );
};

export default Booking;

//styling
const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0;

  h1 {
    color: #33475b;
    font-family: "Raleway", sans-serif;
    font-size: 35px;
    font-weight: 800;
    line-height: 72px;
    margin: 0 0 30px 0;
    text-transform: uppercase;
    ${media.small`
   font-size: 16px;

 `}
  }
`;

const StyledBooking = styled.div`
  display: ${(props) => (props.bookingSubmitted ? "none" : "flex")};
  justify-content: center;
  border: solid #33475b;
  box-shadow: 0 0 15px 5px rgba(31, 73, 125, 0.8);
  position: relative;
  ${media.small`
   flex-direction : column;
   margin-bottom : 40px;
 `}
`;

const StyledButton = styled.div`
  width: 100px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #33475b;
  border: solid 1px black;
  color: white;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
`;
