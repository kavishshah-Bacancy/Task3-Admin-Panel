import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../Components/Input/Input";
import classes from "./Login.module.css";
import authContext from "../Context/authContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function Login(props) {
  let history = useHistory();
  const { setAuthenticated } = useContext(authContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your emailid",
        name: "email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your password",
        name: "password",
        type: "password",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });
  const checkInputvalidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isEmail) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = regex.test(value) && isValid;
    }
    return isValid;
  };
  const onInputChangeHandler = (e, elementId) => {
    const updatedForm = { ...loginForm };
    const updateFormElement = {
      ...updatedForm[elementId],
    };
    updateFormElement.value = e.target.value;
    updateFormElement.valid = checkInputvalidity(
      updateFormElement.value,
      updateFormElement.validation
    );

    updateFormElement.touched = true;
    updatedForm[elementId] = updateFormElement;

    let formValid = true;
    for (let inputElement in loginForm) {
      formValid = loginForm[inputElement].valid && formValid;
    }
    if (e.target.value.trim() === "") {
      formValid = false;
    }
    setLoginForm(updatedForm);
    setIsFormValid(formValid);
  };
  const onLogin = (e) => {
    e.preventDefault();
    let userDetail = JSON.parse(localStorage.getItem("users"));
    let email = userDetail[0].user.email;
    let password = userDetail[0].user.password;

    let typedEmail = "";
    let typedPassword = "";
    let loginData = {};
    for (let inputField in loginForm) {
      loginData[inputField] = loginForm[inputField].value;
    }

    typedEmail = loginData.email;
    typedPassword = loginData.password;
    if (typedEmail === email && typedPassword === password) {
      localStorage.setItem("activeUser", typedEmail);
      toast.success("Logged in Successfully!");
      setAuthenticated(true);
      history.push("/Dashboard");
    } else if (email !== typedEmail) {
      toast.info("User is Not Registered with us");
    } else if (email === typedEmail && typedPassword !== password) {
      toast.error("Incorrect password, Please Try again");
    }
  };

  const formsArray = [];
  for (let loginFormItem in loginForm) {
    console.log(loginFormItem);
    formsArray.push({
      id: loginFormItem,
      config: loginForm[loginFormItem],
    });
  }
  return (
    <div className={classes.logForm}>
      {console.log(props)}
      <p>Login {props.name}</p>
      <form>
        {formsArray.map((formelement) => {
          console.log(formelement);
          return (
            <Input
              key={formelement.id}
              valueType={formelement.id}
              elementType={formelement.config.elementType}
              elementConfig={formelement.config.elementConfig}
              value={formelement.value}
              isValid={!formelement.config.valid}
              touched={formelement.config.touched}
              changed={(e) => onInputChangeHandler(e, formelement.id)}
            />
          );
        })}
        <button
          type="button"
          disabled={!isFormValid}
          onClick={onLogin}
          class="btn btn-info"
          style={{ width: "96%", marginLeft: "2%", marginTop: "5%" }}
        >
          Login
        </button>
        <br></br>
        <div style={{ padding: "2%" }}>
          <Link to="/">Forget Password</Link>
          <br></br>
          Do not have accout ?
          <Link to="/personalDetailsRegistration">Create One</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
