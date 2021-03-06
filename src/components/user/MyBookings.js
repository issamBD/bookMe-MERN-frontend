import React, { useContext, useState, useEffect } from "react";
//context
import userContext from "../../context/userContext";
//components
import Loading from "../front/Loading";
import Login from "../front/Login";
import Header from "../front/Header";
import BookingsContainer from "./BookingsContainer";
import Sidebar from "./Sidebar";

const MyBookings = () => {
  //context
  const { userData } = useContext(userContext);
  //state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {!loading ? (
        userData.user ? (
          <>
            <Header />
            <Sidebar />
            <BookingsContainer />
          </>
        ) : (
          <Login />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MyBookings;
