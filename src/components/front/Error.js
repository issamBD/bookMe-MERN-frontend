import React from "react";
import styled from "styled-components";

const Error = ({ error, setError }) => {
  return (
    <Frame>
      <Err>
        <span>{error}</span>
        <button onClick={() => setError()}>X</button>
      </Err>
    </Frame>
  );
};

export default Error;

const Frame = styled.div`
  width: 100%;
`;

const Err = styled.div`
  font-size: 16px;
  padding: 10px 10px;
  background-color: #d71621;
  color: white;
  font-weight: 700;
  margin: 0 auto;
  width: 100%;

  button {
    color: white;
    background-color: #d71621;
    font-size: 16px;
    cursor: pointer;
    float: right;
    border: none;
  }
`;
