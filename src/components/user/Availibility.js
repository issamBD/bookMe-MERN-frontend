import React from "react";
import uuid from "react-uuid";
import styled from "styled-components";
//components
import media from "../front/Media";
//images
import del from "../../images/delete.png";
//constants
import { DAYS_OF_THE_WEEK_LONG } from "../front/Constants";

const Availibility = ({ periods, setPeriods, hours, setHours }) => {
  //functions
  const today = () => {
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    return date;
  };

  //handlers
  const deletePeriodHandler = (item) => {
    setPeriods(periods.filter((i) => i.id !== item.id));
  };

  const addPeriodClickHandler = () => {
    setPeriods([
      ...periods,
      {
        id: uuid(),
        start: new Date(),
        end: new Date(),
      },
    ]);
  };

  const endDateHandler = (item) => (e) => {
    let newPeriods = [...periods];
    item.end = new Date(e.currentTarget.value);
    setPeriods(newPeriods);
  };

  const startDateHandler = (item) => (e) => {
    let newPeriods = [...periods];
    item.start = new Date(e.currentTarget.value);
    setPeriods(newPeriods);
  };

  const dayHandler = (item) => (e) => {
    let newHours = [...hours];
    item.day = e.currentTarget.value;
    setHours(newHours);
  };

  const startHourHandler = (item) => (e) => {
    let newHours = [...hours];
    item.hour.from = e.currentTarget.value;
    setHours(newHours);
  };

  const endHourHandler = (item) => (e) => {
    let newHours = [...hours];
    item.hour.to = e.currentTarget.value;
    setHours(newHours);
  };

  const addNewDayHandler = () => {
    setHours([
      ...hours,
      {
        day: "Monday",
        id: uuid(),
        hour: {
          from: "09:00",
          to: "17:00",
        },
      },
    ]);
  };

  const deleteDayHandler = (item) => {
    setHours(hours.filter((i) => i.id !== item.id));
  };

  return (
    <Container>
      <Label htmlFor="">Available dates for booking</Label>
      <Periods>
        {periods.map((item) => (
          <Period key={item.id} item={item}>
            <div id="input">
              <span>from</span>
              <input
                type="date"
                defaultValue={today()}
                onChange={startDateHandler(item)}
              />
              <span>to</span>
              <input
                type="date"
                defaultValue={today()}
                onChange={endDateHandler(item)}
              />
            </div>
            {periods.length > 1 && (
              <img onClick={() => deletePeriodHandler(item)} src={del} alt="" />
            )}
          </Period>
        ))}
      </Periods>
      <button onClick={addPeriodClickHandler}>Add period</button>

      <Hours>
        <Label htmlFor="">Available hours for booking</Label>

        {hours.map((item) => {
          return (
            <Hour key={item.id}>
              <div id="input">
                <select id="drop" value={item.day} onChange={dayHandler(item)}>
                  {DAYS_OF_THE_WEEK_LONG.map((day) => (
                    <option key={uuid()}>{day}</option>
                  ))}
                </select>
                <span>from</span>
                <input
                  type="time"
                  defaultValue={item.hour.from}
                  onChange={startHourHandler(item)}
                />
                <span>to</span>
                <input
                  type="time"
                  defaultValue={item.hour.to}
                  onChange={endHourHandler(item)}
                />
              </div>
              {hours.length > 1 && (
                <img onClick={() => deleteDayHandler(item)} src={del} alt="" />
              )}{" "}
            </Hour>
          );
        })}
        <button onClick={addNewDayHandler}>Add hours</button>
      </Hours>
    </Container>
  );
};

export default Availibility;

const Container = styled.div`
  color: #2c2c2c;
  padding: 0 0 0 20px;
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

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: 700;
`;
const Periods = styled.div`
  input {
    text-align: center;
    width: 150px;
    font-size: 14px;
    padding: 5px;
  }
`;

const Period = styled.div`
  margin: 10px 0;
  display: flex;
  width: 440px;
  justify-content: space-between;
  align-items: center;
  ${media.small`
     width: 100%;
   `}

  #input {
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.small`
     width: 80%;
    font-size: 12px;
   `}
  }
`;

const Hours = styled.div`
  input {
    text-align: center;
    width: 120px;
    font-size: 14px;
    padding: 5px;
    ${media.small`
    flex-basis : 30%;
    font-size: 12px;
   `}
  }
  margin: 40px 0;
`;

const Hour = styled.div`
  margin: 10px 0;
  display: flex;
  width: 480px;
  justify-content: space-between;
  align-items: center;
  ${media.small`
     width: 80%;
    font-size: 12px;
   `}
  #input {
    width: 450px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.small`
     width: 80%;
    font-size: 12px;
   `}
  }
  #drop {
    text-align: center;
    width: 120px;
    font-size: 14px;
    padding: 5px;
    ${media.small`
     width: 80px;
    font-size: 12px;
   `}
  }
`;
