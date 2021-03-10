import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import { useState } from "react";
import Login from "./container/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserDetails from "./Components/UserDetails/UserDetails";
import EducationDetails from "./Components/EducationDetails/EducationDetails";
import authContext from "./container/Context/authContext";
import PersonalDetails from "./container/Registration/PersonalRegistration";
import PersonalRegistration from "./container/Registration/PersonalRegistration";
import EducationRegistration from "./container/Registration/EducationRegistration";
import Authguard from "./Components/Authguard/Authguard";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

export const MyContext = React.createContext();
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("activeUser")) {
      setAuthenticated(true);
    }
  }, []);
  return (
    <div>
      <authContext.Provider value={{ authenticated, setAuthenticated }}>
        <Router>
          <Navbar>
            <Switch>
              <Route path="/" exact component={Login} />
              <Authguard path="/Dashboard" component={Dashboard} />
              <Authguard path="/user-details" component={UserDetails} />
              <Authguard
                path="/education-details"
                component={EducationDetails}
              />
              <Route
                path="/personalDetailsRegistration"
                component={PersonalRegistration}
              />
              <Route
                path="/educationDetailsRegistration"
                component={EducationRegistration}
              />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Navbar>
        </Router>
      </authContext.Provider>
    </div>
  );
}

export default App;
