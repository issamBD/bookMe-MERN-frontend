import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
//context
import userContext from "../../context/userContext";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
//images
import logo from "../../images/logo.png";
import media from "../front/Media";

const Header = () => {
  //context
  const { userData, setUserdata } = useContext(userContext);

  //history
  const history = useHistory();

  //functions
  const register = () => history.push("/register");

  const login = () => history.push("/login");

  const logout = () => {
    setUserdata({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  const createPath = () => {
    let path = window.location.pathname;
    if (path.slice(-1) === "/") path = path.slice(0, -1);
    if (path.includes("mybookings")) {
      return (
        <span>
          <StyledLink to="/dashboard">Dashboard</StyledLink>{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          <StyledLink to="/mybookings">My bookings</StyledLink>
        </span>
      );
    }
    if (path.includes("mytools")) {
      return (
        <span>
          <StyledLink to="/dashboard">Dashboard</StyledLink>{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          <StyledLink to="/mytools">My tools</StyledLink>
        </span>
      );
    }
    if (path.includes("createTool")) {
      return (
        <span>
          <StyledLink to="/dashboard">Dashboard</StyledLink>{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          <StyledLink to="/createTool">New tool</StyledLink>
        </span>
      );
    }
    if (path.includes("tool")) {
      return (
        <span>
          <StyledLink to="/dashboard">Dashboard</StyledLink>{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          <StyledLink to="/tool">Tool</StyledLink>
        </span>
      );
    }
    if (path.includes("getbooking")) {
      return (
        <span>
          <StyledLink to="/dashboard">Dashboard</StyledLink>{" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
          <StyledLink to="/getbooking">Booking</StyledLink>
        </span>
      );
    }
    return undefined;
  };

  return (
    <>
      <Container>
        <StyledLink to="/">
          <img id="logo" src={logo} alt="" />
        </StyledLink>
        {userData.user && (
          <Buttons>
            <button onClick={() => history.push("/dashboard")}>
              Dashboard
            </button>
            <button onClick={logout}>Logout</button>
          </Buttons>
        )}
        {userData.user === undefined && (
          <Buttons>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
          </Buttons>
        )}
      </Container>
      {createPath() && <Path>{createPath()}</Path>}
    </>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 100px;
  background-color: #33475b;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    margin-right: 20px;

    padding: 5px 15px;
    color: #33475b;
    background-color: white;
    font-size: 12px;
    border-radius: 3px;
    border: solid 1px white;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: #33475b;
      color: white;
      border: solid 1px white;
    }
    ${media.small`
    margin-right: 10px;
    padding: 5px 10px;`}
  }
  #logo {
    height: 40px;
  }
  ${media.small`

  padding: 0 20px;
`}
`;

const Buttons = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #33475b;
  cursor: pointer;
  text-decoration: none;
`;

const Path = styled.div`
  margin: 20px auto;
  width: 660px;
  font-size: 12px;
  ${media.small`

    width : 90%;
   `}
`;
