/* eslint-disable import/no-anonymous-default-export */
import React, { Component, useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import authContext from "../../container/Context/authContext";

const AuthRoute = (props) => {
  const { authenticated, setAuthenticated } = useContext(authContext);
  return (
    <Route
      path={props.path}
      render={(data) =>
        authenticated ? (
          <props.component></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    />
  );
};

export default AuthRoute;
