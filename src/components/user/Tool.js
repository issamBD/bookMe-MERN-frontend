import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
//context
import userContext from "../../context/userContext";
//components
import Loading from "../front/Loading";
import Login from "../front/Login";
import Header from "../front/Header";
import Sidebar from "./Sidebar";
import Popup from "./Popup";
import media from "../front/Media";
//constants
import { DELETE, SHARE } from "../front/Constants";

const Tool = () => {
  //context
  const { userData, setUserdata } = useContext(userContext);
  //state
  const [loading, setLoading] = useState(true);
  const [tool, setTool] = useState();
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
      name: tool.name,
      id: tool._id,
      mode: DELETE,
    });
  };

  const shareHandler = () => {
    setPopUp({
      toggle: !popUp.toggle,
      name: tool.name,
      id: tool._id,
      mode: SHARE,
    });
  };

  const updateStatus = async () => {
    try {
      const query = { tool_id: tool._id, newStatus: !tool.status };
      await axios.post(
        "https://book-me-project.herokuapp.com/tools/updateStatus",
        query
      );
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = () => {
    history.push(`/createTool/${tool._id}`);
  };

  //API calls
  useEffect(() => {
    let path = window.location.pathname;
    if (path.slice(-1) === "/") path = path.slice(0, -1);
    let tool_id = { id: path.substring(path.lastIndexOf("/") + 1) };
    if (tool_id.id === "tool") history.push("/mytools");
    try {
      const getToolData = async () => {
        const toolData = await axios.post(
          "https://book-me-project.herokuapp.com/tools/getTool",
          tool_id
        );
        setTool(toolData.data);
      };
      getToolData();
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
              type="tool"
              id={popUp.id}
              mode={popUp.mode}
            />{" "}
            {tool && (
              <Container>
                <Info>
                  <p>Name : </p>
                  <p>{tool.name}</p>
                </Info>
                <Info>
                  <p>Status : </p>
                  <p>{tool.status ? "active" : "inactive"}</p>
                </Info>
                <Info>
                  <p>Bookings : </p>
                  <p>{tool.bookings}</p>
                </Info>
                <Info>
                  <p>Durations : </p>
                  <div>
                    {tool.durations.map((duration) => {
                      return <p>{duration} min</p>;
                    })}
                  </div>
                </Info>
                <Info>
                  <p>Periods : </p>
                  <div>
                    {tool.periods.map((period) => {
                      return (
                        <p>
                          <b>from</b>{" "}
                          {new Date(period.start).toLocaleDateString()}{" "}
                          <b>to</b> {new Date(period.end).toLocaleDateString()}
                        </p>
                      );
                    })}
                  </div>
                </Info>
                <Info>
                  <p>Hours</p>
                  <Dates>
                    {Object.entries(tool.hours[0]).map((date) => {
                      return (
                        <div>
                          <p className="date">{date[0]}</p>
                          {date[1].map((h) => {
                            return (
                              <p>
                                from {h.hour.from} to {h.hour.to}
                              </p>
                            );
                          })}
                        </div>
                      );
                    })}
                  </Dates>
                </Info>
                <Info>
                  <p>Questions</p>
                  <Question>
                    {tool.questions.map((question) => {
                      return (
                        <p>
                          {question.question} {question.required ? "*" : ""}
                        </p>
                      );
                    })}
                  </Question>
                </Info>
              </Container>
            )}
            <Buttons>
              <button onClick={() => history.push("/dashboard")}>back</button>
              <button onClick={editHandler}>edit</button>
              <button onClick={() => shareHandler()}>share</button>
              <button onClick={updateStatus}>
                {tool.status ? "inactivate" : "activate"}
              </button>
              <button
                onClick={() => {
                  deleteHandler();
                }}
              >
                delete
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

export default Tool;

const Container = styled.div`
  border: solid 1px #33475b;
  width: 650px;
  background-color: white;
  margin: 0 auto;

  > div:nth-child(even) {
    background-color: #f0f0f0;
  }
  .date {
    margin: 5px 0;
    font-weight: 700;
  }
  b {
    font-weight: 700;
  }
  ${media.small`
     width: 90%;
   `}
`;

const Buttons = styled.div`
  width: 650px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  button {
    float: right;
    margin: 0 0 30px 0;
    cursor: pointer;
    width: 100px;

    background-color: #33475b;
    color: white;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    border: solid 1px #33475b;
    &:hover {
      color: #33475b;
      background-color: white;
    }
    ${media.small`
  width : auto;
   padding : 5px 8px;

   `}
  }
  ${media.small`
  width: 90%;

   `}
`;
const Info = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 14px;
    p {
      margin: 10px 0;
    }
  }
`;

const Dates = styled.div`
  font-size: 14px;
  > div {
    margin: 10px 0;
  }
`;

const Question = styled.div`
  > p {
    margin: 5px 0;
  }
`;
