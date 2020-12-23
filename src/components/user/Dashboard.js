import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
//context
import userContext from "../../context/userContext";
//components
import BookingsContainer from "./BookingsContainer";
import ToolsContainer from "./ToolsContainer";
import Header from "../front/Header";
import Summary from "./Summary";
import Sidebar from "./Sidebar";
import Loading from "../front/Loading";
import Login from "../front/Login";
import media from "../front/Media";

const Dashboard = () => {
  //states
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(userContext);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Frame>
      {!loading ? (
        userData.user ? (
          <>
            <Header />
            <Sidebar />
            <Summary />
            <Section>
              <span>My Tools</span>
            </Section>
            <ToolsContainer />
            <Section>
              <span>My Bookings</span>
            </Section>
            <BookingsContainer />
          </>
        ) : (
          <Login />
        )
      ) : (
        <Loading />
      )}
    </Frame>
  );
};

export default Dashboard;

const Section = styled.div`
  width: 660px;
  margin: 20px auto;
  background-color: #33475b;
  color: white;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: white;
  }
  ${media.small`
     width: 90%;

   `}
`;

const Frame = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 0 50px 0;
`;
