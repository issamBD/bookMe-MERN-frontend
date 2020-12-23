import React from "react";
import loading from "../../images/loading.png";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <img src={loading} alt="" />
      <p>loading...</p>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    margin: 10px 0;
  }
  img {
    width: 100px;
  }
`;
