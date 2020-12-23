import React, { useContext } from "react";
import styled from "styled-components";
//context
import bookingContext from "../../context/bookingContext";
//components
import media from "../front/Media";
//images
import checked from "../../images/checked.png";

const Success = () => {
  //context
  const { bookingData } = useContext(bookingContext);

  return (
    <Frame>
      <Container>
        <img src={checked} alt="" />
        <h1>Appointment booked successfully</h1>
        <div>
          <p>on :</p>
          <h3>{bookingData.booking}</h3>
          <p>with {bookingData.displayedName}</p>
        </div>
      </Container>
    </Frame>
  );
};

export default Success;

//styling
const Frame = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap");
  font-family: "Roboto", sans-serif;
  width: 780px;
  min-height: 200px;
  border: solid #33475b;
  padding: 80px 5% 130px 5%;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 15px 5px rgba(31, 73, 125, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${media.small`
  width: 90%;

 `}
  img {
    width: 100px;
    height: auto;
    margin: 0 0 10px 0;
  }
  h1 {
    margin: 20px 0;
    ${media.small`
  font-size : 20px;

 `}
  }
  h3 {
    margin: 20px 0;
    ${media.small`
  font-size : 14px;

 `}
  }
`;
