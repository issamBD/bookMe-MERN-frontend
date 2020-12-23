import React from "react";
import styled from "styled-components";
//components
import media from "../front/Media";
import Header from "./Header";
//images
import HeaderImg from "../../images/header.png";
import dashboard from "../../images/dashboard.png";
import costumer from "../../images/costumer.png";
import calendar from "../../images/calendar.png";

const Home = () => {
  return (
    <div>
      <Header />
      <Cover />
      <Heading>
        <img id="header" src={HeaderImg} alt="" />
        <h1>Connect With your potential Costumers</h1>
        <Buttoms>
          <a href="#work">
            <button>How it works</button>
          </a>
          <a href="/register">
            <button>Register Now</button>
          </a>
        </Buttoms>
      </Heading>
      <Works id="work">
        <div>
          <img src={calendar} alt="" />
          <p>Set your availibity and craete multiple calendars</p>
        </div>
        <div>
          <img src={costumer} alt="" />

          <p>Share your calendars with your potential costumers</p>
        </div>
        <div>
          <img src={dashboard} alt="" />
          <p>Manage all your calendars and booking on one page</p>
        </div>
      </Works>
      <Footer>® All rights reserved to Issam Boughedda || 2020</Footer>
    </div>
  );
};

export default Home;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 50px);
  flex-direction: column;
  #header {
    width: 100%;
    height: calc(100vh - 50px);
    object-fit: cover;
    position: absolute;
    z-index: 1;
    top: 50px;
    left: 0;
  }
  h1 {
    z-index: 3;
    color: #1b3c5e;
    text-transform: uppercase;
    font-size: 50px;
    font-weight: 700;
    ${media.small`
    font-size: 30px;
    margin : 0 20px;
    text-align : center;
    line-height : 1.2em;
 `}
  }
`;

const Cover = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #f0f0f0;
  position: absolute;
  top: 50px;
  left: 0;
  opacity: 70%;
  z-index: 2;
`;

const Buttoms = styled.div`
  z-index: 3;
  margin: 50px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    margin: 0 30px;
    font-size: 30px;
    padding: 10px 20px;
    background: none;
    color: #1b3c5e;
    border: solid 2px #1b3c5e;
    cursor: pointer;
    ${media.small`
    margin : 20px 0;
    width : 300px;
 `}
    &:hover {
      background-color: #1b3c5e;
      color: white;
    }
  }
  ${media.small`
    flex-direction : column;
    align-items : center;
    justify-content : center;
 `}
`;

const Works = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 200px;
    margin: 0 50px;
    ${media.small`
  width : 90%;
 `}
  }
  > div {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 50px auto;
    color: #1b3c5e;
    font-size: 30px;
    align-items: center;
    ${media.small`
   flex-direction : column;
   font-size: 16px;
   text-align : center;
   margin : 20px;
   line-height : 1.2rem;
   font-weight : 700;
   width : 90%;
   p{
      margin : 20px 0;
   }
 `}
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #10263b;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
