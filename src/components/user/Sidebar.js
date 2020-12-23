import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//components
import media from "../front/Media";

const Sidebar = () => {
  return (
    <Frame>
      <Title>Tools</Title>
      <StyledLink to="/createTool">
        <p className="subtitle">Create new tool</p>
      </StyledLink>
      <StyledLink to="/mytools">
        <p className="subtitle">get all tools</p>
      </StyledLink>
      <Title>Bookings</Title>
      <StyledLink to="/mybookings">
        <p className="subtitle">get all booking</p>
      </StyledLink>
    </Frame>
  );
};

export default Sidebar;

const Frame = styled.div`
  width: 250px;
  background-color: #4a6580;
  position: fixed;
  top: 80px;
  left: 20px;
  color: white;
  border-radius: 5px;
  padding-bottom: 10px;

  ${media.large`
     width: 70%;
     position : relative;
     margin : 20px auto;
     top: 0;
     left: 0;
   `}
  ${media.small`
     width: 90%;
   
   `}
  .subtitle {
    padding: 10px;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #33475b;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
