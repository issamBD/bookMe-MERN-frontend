import React from "react";
import styled from "styled-components";
import uuid from "react-uuid";
//images
import del from "../../images/delete.png";

const Details = ({ name, setName, durations, setDurations }) => {
  //handlers
  const addDurationClickHandler = () => {
    if (durations.length < 3) {
      setDurations([
        ...durations,
        {
          id: uuid(),
          hour: 0,
          minut: 0,
        },
      ]);
    }
  };

  const hourHandler = (item) => (e) => {
    let newDurations = [...durations];
    item.hour = e.currentTarget.value;
    setDurations(newDurations);
  };

  const minutHandler = (item) => (e) => {
    let newDurations = [...durations];
    item.minut = e.currentTarget.value;
    setDurations(newDurations);
  };

  const deleteDurationHandler = (item) => {
    setDurations(durations.filter((i) => i.id !== item.id));
  };
  return (
    <Container>
      <Label>Name of calendar</Label>
      <input
        placeholder="Choose a name"
        name="name"
        type="text"
        defaultValue={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Durations>
        <Label>Duration of booking</Label>

        {durations.map((item) => (
          <Duration key={item.id}>
            <div id="input">
              <input
                type="number"
                min="0"
                max="23"
                defaultValue={item.hour}
                onChange={hourHandler(item)}
              />
              <span>hour</span>
              <input
                type="number"
                placeholder="00"
                min="0"
                max="59"
                defaultValue={item.minut}
                onChange={minutHandler(item)}
              />
              <span>min</span>
            </div>

            {durations.length > 1 && (
              <img
                onClick={() => deleteDurationHandler(item)}
                src={del}
                alt=""
              />
            )}
          </Duration>
        ))}
        {durations.length < 3 && (
          <button onClick={addDurationClickHandler}>Add duration</button>
        )}
      </Durations>
    </Container>
  );
};

export default Details;

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px;
  input {
    width: 240px;
    padding: 5px;
    font-size: 14px;
  }
  img {
    cursor: pointer;
  }
  span {
    font-size: 14px;
    color: #5a5a5a;
    margin: 0 5px;
  }
  button {
    color: #33475b;
    background-color: white;
    width: 150px;
    border-radius: 2px;
    border: none;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    border: solid 1px #33475b;
    &:hover {
      background-color: #33475b;
      color: white;
    }
  }
`;

const Durations = styled.div`
  margin: 20px 0 0 0;
`;
const Label = styled.div`
  display: block;
  margin: 10px 0;
  font-weight: 700;
`;

const Duration = styled.div`
  margin: 10px 0;
  display: flex;
  width: 250px;
  justify-content: space-between;
  align-items: center;
  input {
    width: 70px;
  }
  #input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 220px;
  }
`;
