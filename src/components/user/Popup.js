import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
//components
import media from "../front/Media";
//constants
import { DELETE } from "../front/Constants";

const Popup = ({ display, name, type, id, mode }) => {
  //state
  const [toDisplay, setToDisplay] = useState(false);
  //history
  const history = useHistory();

  useEffect(() => {
    if (name) {
      setToDisplay(!toDisplay);
    }
  }, [display]);
  const cancelHandler = () => {
    setToDisplay(false);
  };

  //functions
  const deleteFunction = async () => {
    try {
      if (type === "tool") {
        const tooldeleted = { tool: id };
        await axios.delete(
          "https://book-me-project.herokuapp.com/tools/delete",
          {
            data: tooldeleted,
          }
        );
      } else {
        const bookingdeleted = { booking: id };
        await axios.delete(
          "https://book-me-project.herokuapp.com/bookings/delete",
          {
            data: bookingdeleted,
          }
        );
      }
      let path = window.location.pathname;
      if (path.slice(-1) === "/") path = path.slice(0, -1);
      let page = path.substring(path.lastIndexOf("/") + 1);
      if (page === "dashboard") history.go(0);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Frame display={toDisplay ? true : false}>
      <Container />
      {mode === DELETE ? (
        <Box>
          <p>
            Are you sure you want to delete this {type} : {name}
          </p>
          <Buttons>
            <button onClick={cancelHandler}>cancel</button>

            <button onClick={deleteFunction}>delete</button>
          </Buttons>
        </Box>
      ) : (
        <Box>
          <p>Share this link with your costumers</p>
          <input
            value={`thebookmeproject.netlify.app/booking/${id}`}
            type="text"
            readOnly
          />
          <Buttons>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `thebookmeproject.netlify.app/booking/${id}`
                );
              }}
            >
              copy link
            </button>

            <button onClick={cancelHandler}>close</button>
          </Buttons>
        </Box>
      )}
    </Frame>
  );
};

export default Popup;

const Frame = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
`;

const Container = styled.div`
  background-color: black;
  opacity: 70%;
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  width: 600px;
  height: 150px;
  padding: 20px;
  background-color: #f0f0f0;
  position: fixed;
  left: calc(50% - 300px);
  top: calc(50% - 75px);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  font-size: 16px;
  ${media.small`
     width: 90%;
     left: 5%;
     top: calc(50% - 75px);
   `}
  input {
    width: 80%;
    padding: 5px;
    font-size: 14px;
    color: #333333;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    margin: 0 20px;
    cursor: pointer;
    background-color: #33475b;
    border: solid 1px #33475b;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 14px;

    &:hover {
      background-color: white;
      color: #33475b;
    }
  }
`;
