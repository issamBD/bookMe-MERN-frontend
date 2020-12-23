import React from "react";
import styled from "styled-components";
import uuid from "react-uuid";

const Time = ({ time, setTime, duration, setDuration, durations, hours }) => {
  //handlers
  const durationOnClickHandler = (e) => {
    setDuration(e.currentTarget.dataset.value);
  };

  const timeOnClickHandler = (e) => {
    setTime(e.currentTarget.dataset.value);
  };

  return (
    <Frame>
      <p id="durationLabel">Choose the duration</p>
      <Durations>
        {durations.map((d) => {
          return (
            <Duration
              key={uuid()}
              selected={d === parseInt(duration)}
              data-value={d}
              onClick={durationOnClickHandler}
            >
              {`${d} min`}
            </Duration>
          );
        })}
      </Durations>
      {hours ? (
        <>
          <p id="hourLabel">Choose the time</p>

          <Hours>
            {hours.map((hour) => {
              return (
                <Hour
                  key={uuid()}
                  selected={hour === time}
                  data-value={hour}
                  onClick={timeOnClickHandler}
                >
                  {hour}
                </Hour>
              );
            })}
          </Hours>
        </>
      ) : (
        <Hours></Hours>
      )}
    </Frame>
  );
};

export default Time;

const Frame = styled.div`
  position: relative;

  min-width: 380px;
  height: 450px;
  font-size: 14px;
  color: #33475b;
  p {
    font-size: 14px;
    position: absolute;
  }
  #durationLabel {
    top: 20px;
    left: 15%;
  }
  #hourLabel {
    top: 110px;
    left: 15%;
  }
`;
const Durations = styled.div`
  text-align: center;
  position: absolute;
  top: 50px;
  left: 15%;
  width: 70%;
  margin: 0 auto;
  display: flex;
  border-right: solid 1px black;
  flex-direction: row;
  align-items: stretch;
`;

const Duration = styled.div`
  // width: calc(50% - 1px); //replace with stretch
  flex: 1;
  border: solid 1px black;
  height: auto;
  padding: 8px 0%;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#33475b;" : "#F0F0F0")};
  color: ${(props) => (props.selected ? "white;" : "black")};
  border-right-style: none;
`;

const Hours = styled.div`
  width: 70%;
  height: 200px;
  margin: 0 auto;
  overflow-y: scroll;
  position: absolute;
  top: 140px;
  left: 15%;
`;

const Hour = styled.div`
  width: 90%;
  cursor: pointer;
  padding: 8px 0;
  text-align: center;
  border: solid 1px grey;
  background-color: #f0f0f0;
  margin-bottom: 10px;

  background-color: ${(props) => (props.selected ? "#33475b;" : "#F0F0F0")};
  color: ${(props) => (props.selected ? "white;" : "black")};
`;
