import React from "react";
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

export const MyContext = React.createContext();
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div>
      <authContext.Provider value={{ authenticated, setAuthenticated }}>
        <Router>
          <Navbar>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/user-details" component={UserDetails} />
              <Route path="/education-details" component={EducationDetails} />
              <Route
                path="/personalDetailsRegistration"
                component={PersonalRegistration}
              />
              <Route
                path="/educationDetailsRegistration"
                component={EducationRegistration}
              />
            </Switch>
          </Navbar>
        </Router>
      </authContext.Provider>
    </div>
  );
}

export default App;
