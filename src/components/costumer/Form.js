import React, { useEffect } from "react";
import styled from "styled-components";
//components
import media from "../front/Media";

const Form = ({
  questions,
  bookingSubmitted,
  setformValidated,
  answered,
  setAnswered,
  costumerChoice,
  setBookingSubmitted,
}) => {
  useEffect(() => {
    let myForm = [];
    questions.map((q) => {
      myForm.push({
        id: q.id,
        question: q.question,
        answer: null,
        required: q.required,
      });
      return true;
    });
    setAnswered(myForm);
  }, []);

  //handlers
  const formValidation = () => {
    setformValidated(true);
  };

  const inputHandler = (id) => (e) => {
    let newAnswers = [...answered];
    newAnswers.map((a) => {
      if (a.id === id) {
        a.answer = e.target.value;
        return true;
      }
    });
    setAnswered(newAnswers);
  };

  return (
    <Container bookingSubmitted={bookingSubmitted}>
      <h2>Confirm booking</h2>
      <Date>
        {costumerChoice}{" "}
        <span onClick={() => setBookingSubmitted(false)}>change</span>
      </Date>

      {questions.map((q) => {
        return (
          <div key={q.id}>
            <Label>{q.question}</Label>
            <input
              type="text"
              required={q.required}
              onChange={inputHandler(q.id)}
            />
          </div>
        );
      })}
      <StyledButton onClick={formValidation}>Submit</StyledButton>
    </Container>
  );
};

export default Form;

//styling
const Container = styled.div`
  display: ${(props) => (props.bookingSubmitted ? "block" : "none")};

  width: 780px;
  border: solid #33475b;
  padding: 80px 5% 130px 5%;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 15px 5px rgba(31, 73, 125, 0.8);
  ${media.small`
  width: 100%;

 `}
  input {
    width: 95%;
    font-size: 16px;
    padding: 10px;
    background-color: #ebe8e8;
    border: solid 1px #5c5b5b;
    outline: none;
    border-radius: 5px;
    color: #161616;
  }
  h2 {
    margin-bottom: 20px;
  }
`;

const Label = styled.div`
  display: block;
  margin: 10px 0;
  font-size: 16px;
`;

const StyledButton = styled.div`
  width: 100px;
  position: absolute;
  bottom: 15px;
  right: 10%;
  margin: 15px 0;
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

const Date = styled.div`
  margin: 0 0 40px 0;
  font-weight: 700;
  font-size: 16px;
  color: #0a0a8d;
  span {
    color: red;
    font-style: italic;
    cursor: pointer;
    font-size: 14px;
  }
`;
