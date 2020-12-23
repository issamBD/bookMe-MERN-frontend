import React, { useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
//components
import media from "../front/Media";
//images
import del from "../../images/delete.png";

const Form = ({ questions, setQuestions }) => {
  //states
  const [input, setInput] = useState("");
  const [required, setRequired] = useState(false);

  //handlers
  const requiredHandler = (item) => {
    var newquestions = [...questions];
    item.required = !item.required;
    setQuestions(newquestions);
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const addQuestionHandler = () => {
    if (input !== "") {
      setQuestions([
        ...questions,
        {
          id: uuid(),
          question: input,
          required: required,
          toDelete: true,
        },
      ]);

      setRequired(false);
      setInput("");
    }
  };

  const deleteQuestionHandler = (item) => {
    setQuestions(questions.filter((i) => i.id !== item.id));
  };

  return (
    <Container>
      <p>Questions to ask at booking</p>
      {questions.map((item) => {
        return (
          <Question key={item.id}>
            <Label>{item.question}</Label>

            {item.toDelete && (
              <div>
                <input
                  type="checkbox"
                  defaultChecked={item.required}
                  onChange={() => requiredHandler(item)}
                />
                <span>required</span>
                <img
                  onClick={() => {
                    deleteQuestionHandler(item);
                  }}
                  src={del}
                  alt=""
                />
              </div>
            )}
          </Question>
        );
      })}

      <Add>
        <input
          placeholder="Enter a new question"
          onChange={inputHandler}
          type="text"
          value={input}
        />
        <div>
          <input
            type="checkbox"
            checked={required}
            onChange={() => setRequired(!required)}
          />
          <span>required</span>
        </div>
      </Add>
      <button onClick={addQuestionHandler}>add question</button>
    </Container>
  );
};

export default Form;

const Container = styled.div`
  color: #2c2c2c;
  box-sizing: border-box;
  padding: 0 0 20px 20px;
  img {
    cursor: pointer;
  }
  span {
    font-size: 16px;
    color: #5a5a5a;
    margin: 0 5px;
    ${media.small`
    font-size: 12px;

   `}
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
  p {
    margin: 0 0 20px 0;
    font-weight: 700;
  }
`;

const Label = styled.div`
  margin: 0 0 10px 0;
  border: solid 1px #33475b;
  width: 350px;
  padding: 10px;
  font-size: 16px;
  background-color: #f0f0f0;
`;

const Question = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  ${media.small`
     width: 70%;
    font-size: 12px;
   `}
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Add = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 5px 0;
  width: 480px;
  ${media.small`
     width: 70%;
    font-size: 12px;
   `}
  input {
    margin: 10px 0;
    border: solid 1px #33475b;
    width: 350px;
    padding: 10px;
    font-size: 14px;
    overflow-x: hidden;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
  }
`;
