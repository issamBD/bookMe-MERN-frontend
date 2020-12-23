import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
//context
import userContext from "../../context/userContext";
//components
import Form from "./Form";
import Availibility from "./Availibility";
import Details from "./Details";
import axios from "axios";
import Error from "../front/Error";
import Header from "../front/Header";
import Loading from "../front/Loading";
import Login from "../front/Login";
import Sidebar from "./Sidebar";
import media from "../front/Media";

const CreateTool = () => {
  //states
  const [tool, setTool] = useState(null);
  const [name, setName] = useState();
  const [periods, setPeriods] = useState();
  const [durations, setDurations] = useState();
  const [hours, setHours] = useState();
  const [questions, setQuestions] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  //history
  const history = useHistory();
  //context
  const { userData } = useContext(userContext);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  //API calls
  useEffect(() => {
    const checkEdit = async () => {
      let path = window.location.pathname;
      if (path.slice(-1) === "/") path = path.slice(0, -1);

      let tool_id = path.substring(path.lastIndexOf("/") + 1);
      if (tool_id !== "createTool") {
        let tool = await axios.post(
          "https://book-me-project.herokuapp.com/tools/getTool",
          {
            id: tool_id,
            editing: true,
          }
        );
        setName(tool.data.name);
        setPeriods(tool.data.periods);
        let durations = tool.data.durations.map((d) => {
          let hour = parseInt(d / 60);
          let minut = d % 60;
          return {
            id: uuid(),
            hour: hour,
            minut: minut,
          };
        });
        setDurations(durations);
        setHours(tool.data.hours);
        setQuestions(tool.data.questions);
        setTool(tool_id);
      } else {
        setDurations([
          {
            id: uuid(),
            hour: 1,
            minut: 0,
          },
        ]);

        setPeriods([
          {
            id: uuid(),
            start: new Date(),
            end: new Date(),
          },
        ]);

        setHours([
          {
            day: "Monday",
            id: uuid(),
            hour: {
              from: "09:00",
              to: "17:00",
            },
          },
          {
            day: "Tuesday",
            id: uuid(),
            hour: {
              from: "09:00",
              to: "17:00",
            },
          },
          {
            day: "Wedensday",
            id: uuid(),
            hour: {
              from: "09:00",
              to: "17:00",
            },
          },
          {
            day: "Thursday",
            id: uuid(),
            hour: {
              from: "09:00",
              to: "17:00",
            },
          },
          {
            day: "Friday",
            id: uuid(),
            hour: {
              from: "09:00",
              to: "17:00",
            },
          },
        ]);

        setQuestions([
          {
            id: uuid(),
            question: "Your name",
            required: true,
            toDelete: false,
          },
          {
            id: uuid(),
            question: "Your email",
            required: true,
            toDelete: false,
          },
          {
            id: uuid(),
            question: "Your phone number",
            required: true,
            toDelete: false,
          },
        ]);
      }
    };
    checkEdit();
  }, []);

  //handlers
  const submit = async (e) => {
    try {
      await axios.post("https://book-me-project.herokuapp.com/tools/create", {
        tool_id: tool,
        username: userData.user.name,
        user_id: userData.user.id,
        name,
        durations,
        periods,
        hours,
        questions,
      });
      history.push("/dashboard");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <Frame>
      {!loading ? (
        userData.user && periods ? (
          <>
            <Header />
            <Sidebar />

            <>
              <Container>
                {error && <Error error={error} setError={setError} />}
                <Details
                  name={name}
                  setName={setName}
                  durations={durations}
                  setDurations={setDurations}
                />
                <Availibility
                  periods={periods}
                  setPeriods={setPeriods}
                  hours={hours}
                  setHours={setHours}
                />
                <Form questions={questions} setQuestions={setQuestions} />
              </Container>
              <Buttons>
                <button
                  className="button"
                  id="back"
                  onClick={() => history.push("/dashboard")}
                >
                  cancel
                </button>
                <button className="button" onClick={submit}>
                  {tool ? "Edit tool" : "Create new Tool"}
                </button>
              </Buttons>
            </>
          </>
        ) : (
          <Login />
        )
      ) : (
        <Loading />
      )}
    </Frame>
  );
};

export default CreateTool;

const Frame = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f0f0f0;

  .button {
    background-color: #33475b;
    color: white;
    //margin: 35px 0;
    width: 150px;
    border-radius: 2px;
    border: none;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    border: solid 1px #33475b;
    &:hover {
      color: #33475b;
      background-color: white;
    }
  }
`;

const Container = styled.div`
  border: solid 1px #33475b;
  width: 650px;
  padding-bottom: 20px;
  background-color: white;
  margin: 0 auto;

  ${media.small`
   width : 90%;
   `}
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  margin: 10px auto 20px auto;
  ${media.small`
   width : 90%;
   `}
`;
