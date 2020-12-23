import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
//context
import userContext from "../../context/userContext";
//components
import Header from "../front/Header";
import Error from "./Error";
import Dashboard from "../user/Dashboard";
import Loading from "./Loading";
import media from "../front/Media";

const Register = () => {
  //states
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  //context
  const { userData, setUserdata } = useContext(userContext);
  //history
  const history = useHistory();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  //handlers
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, password, passwordCheck };
      await axios.post(
        "https://book-me-project.herokuapp.com/users/register",
        newUser
      );
      const loginRes = await axios.post(
        "https://book-me-project.herokuapp.com/users/login",
        {
          email,
          password,
        }
      );
      setUserdata({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/dashboard");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <Frame>
      {!loading ? (
        userData.user ? (
          <>
            <Dashboard />
          </>
        ) : (
          <>
            <Header />
            <Container>
              {error && <Error error={error} setError={setError} />}
              <form onSubmit={submitHandler}>
                <label htmlFor="text">Full name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                />
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                />
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                />
                <label htmlFor="emailCheck">Confirm password</label>
                <input
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  type="password"
                  name="passwordCheck"
                />
                <input id="submit" type="submit" value="register" />
              </form>
            </Container>
            <p>
              Already have an account ?{" "}
              <span id="bottom" onClick={() => history.push("/login")}>
                sign in now
              </span>
            </p>
          </>
        )
      ) : (
        <Loading />
      )}
    </Frame>
  );
};

export default Register;

const Container = styled.div`
  width: 600px;
  margin: 40px auto 20px auto;
  border: solid 1px #33475b;
  padding: 20px 20px;
  background-color: white;
  ${media.small`
  width: 90%;

 `}
  label {
    display: block;
    margin: 10px 0;
  }
  input {
    width: 90%;
    padding: 8px;
    font-size: 14px;
  }
  #submit {
    margin: 20px 0;
    background-color: #33475b;
    color: white;
    width: 150px;
    border-radius: 2px;
    border: none;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    border: solid 1px #33475b;
    &:hover {
      color: #33475b;
      background-color: white;
    }
  }
`;

const Frame = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  p {
    text-align: center;
  }
  #bottom {
    color: #202d3a;
    cursor: pointer;
  }
`;
