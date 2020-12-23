import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import axios from "axios";
import styled from "styled-components";
//context
import userContext from "../../context/userContext";
//components
import Popup from "./Popup";
import media from "../front/Media";
//constants
import { DELETE, SHARE } from "../front/Constants";

const ToolsContainer = () => {
  //context
  const { userData } = useContext(userContext);
  //states
  const [tools, setTools] = useState();
  const [popUp, setPopUp] = useState({
    toggle: false,
    name: undefined,
    id: undefined,
    mode: undefined,
  });

  //handlers
  const deleteHandler = (tool) => {
    setPopUp({
      toggle: !popUp.toggle,
      name: tool.name,
      id: tool._id,
      mode: DELETE,
    });
  };

  const shareHandler = (tool) => {
    setPopUp({
      toggle: !popUp.toggle,
      name: tool.name,
      id: tool._id,
      mode: SHARE,
    });
  };

  //API calls
  useEffect(() => {
    if (userData.user) {
      const user = { user_id: userData.user.id };
      try {
        const getTools = async () => {
          const allTools = await axios.post(
            "https://book-me-project.herokuapp.com/tools/all",
            user
          );
          setTools(allTools.data);
        };
        getTools();
      } catch (error) {
        console.log(error);
      }
    }
  }, [userData]);

  return (
    <div>
      <Heading>
        <p id="nameTag">Name</p>
        <p className="number">Bookings</p>
        <p className="button">Action</p>
      </Heading>
      <Popup
        display={popUp.toggle}
        name={popUp.name}
        type="tool"
        id={popUp.id}
        mode={popUp.mode}
      />{" "}
      <Frame>
        {tools &&
          tools.map((tool) => {
            return (
              <Tool key={uuid()}>
                <Link className="name" to={`/tool/${tool._id}`}>
                  <p>{tool.name}</p>
                </Link>
                <p className="number">{tool.bookings}</p>
                <div className="button">
                  <button onClick={() => shareHandler(tool)}>share</button>
                  <button
                    onClick={() => {
                      deleteHandler(tool);
                    }}
                  >
                    delete
                  </button>{" "}
                </div>
              </Tool>
            );
          })}
      </Frame>
    </div>
  );
};
export default ToolsContainer;

const Tool = styled.div`
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
  .number {
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
  margin: 20px auto 10px auto;
  #nameTag {
    flex-basis: 150px;
  }
  .number {
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
