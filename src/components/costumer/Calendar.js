import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import uuid from "react-uuid";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
//constants
import { DAYS, DAYS_LEAP, DAYS_OF_THE_WEEK, MONTHS } from "../front/Constants";

const Calendar = ({
  date,
  setDate,
  setSelected,
  availibility,
  setTime,
  availableDays,
}) => {
  // //states
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  //functions
  function getStartDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(new Date(year, month - 1, day))}>
          <FontAwesomeIcon icon={faCaretLeft} size="2x" />
        </Button>
        <div>
          {MONTHS[month]} {year}
        </div>
        <Button onClick={() => setDate(new Date(year, month + 1, day))}>
          <FontAwesomeIcon icon={faCaretRight} size="2x" />
        </Button>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map((d) => (
          <Day key={d}>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={uuid()}
                available={
                  availibility.some(
                    (item) =>
                      new Date(item).setHours(0, 0, 0, 0) ===
                      new Date(year, month, d).setHours(0, 0, 0, 0)
                  ) &&
                  availableDays.some(
                    (day) => day === new Date(year, month, d).getDay()
                  ) &&
                  new Date(year, month, d).setHours(23, 59, 59, 59) > new Date()
                }
                isSelected={
                  date.setHours(0, 0, 0, 0) ===
                  new Date(year, month, d).setHours(0, 0, 0, 0)
                }
                onClick={() => {
                  if (
                    availibility.some(
                      (item) =>
                        new Date(item).setHours(0, 0, 0, 0) ===
                          new Date(year, month, d).setHours(0, 0, 0, 0) &&
                        availableDays.some(
                          (day) => day === new Date(year, month, d).getDay()
                        )
                    )
                  ) {
                    setDate(new Date(year, month, d));
                    setSelected(new Date(year, month, d));
                  } else {
                    setTime(null);
                  }
                }}
              >
                {d > 0 ? d : ""}
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
};

export default Calendar;

//styling
const Frame = styled.div`
  min-width: 380px;
  max-width: 380px;
  background-color: #33475b;
  color: white;
  padding: 10px;
  height: 450px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 370px;
  max-height: 370px;
`;

const Day = styled.div`
  width: 40px;
  height: 40px;
  margin: 0px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5%;

  ${(props) =>
    !props.available &&
    css`
      opacity: 50%;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.isSelected &&
    props.available &&
    css`
      background-color: #eee;
      color: #33475b;
    `}
`;
