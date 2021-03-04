import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../Components/Input/Input";
import classes from "./Registration.module.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

function PersonalRegistration(props) {
  let history = useHistory();
  const [personalDetails, setPersonalDetails] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your FirstName",
        name: "firstname",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your LastName",
        name: "Lastname",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    gender: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Male", displayValue: "Male" },
          { value: "Female", displayValue: "Female" },
          { value: "Other", displayValue: "Other" },
        ],
      },
      value: "Male",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
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
    phone: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your Phone",
        name: "phone",
      },
      value: "",
      validation: {
        required: true,
        isPhone: true,
        minLength: 10,
        maxLength: 10,
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
      value: "",
      validation: {
        required: true,
        minLength: 8,
      },
      valid: false,
      touched: false,
    },
    confirmPassword: {
      elementType: "input",
      elementConfig: {
        placeholder: "Confirm password",
        name: "confirmpassword",
        type: "password",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [userRegFlag, setUserRegFlag] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    let personalDetail = {};
    if (localStorage.getItem("personalDetails")) {
      personalDetail = JSON.parse(localStorage.getItem("personalDetails"));
      let exisitingPersoDetail = { ...personalDetails };
      for (let key in exisitingPersoDetail) {
        exisitingPersoDetail[key].value = personalDetail[key];
        exisitingPersoDetail[key].valid = true;
        exisitingPersoDetail[key].touched = true;
      }
      setPersonalDetails(exisitingPersoDetail);
      setIsFormValid(true);
      setName(exisitingPersoDetail["firstName"].value);
    }
  }, []);
  const onClickBackToLogin = () => {
    props.history.goBack();
  };
  const onSubmitPersonalDetails = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      for (let key in users) {
        if (users[key].user.email === personalDetails["email"].value) {
          confirmAlert({
            message: "User is already Registered with us",
            buttons: [
              {
                label: "Move to Login",
                onClick: () => {
                  props.history.goBack();
                },
              },
              {
                label: "Cancel",
                onClick: () => {
                  return;
                },
              },
            ],
          });
          setUserRegFlag(false);
          break;
        } else {
          setUserRegFlag(true);
        }
      }
      if (userRegFlag) {
        let personalArray = {};
        for (let inputs in personalDetails) {
          personalArray[inputs] = personalDetails[inputs].value;
        }
        localStorage.setItem("personalDetails", JSON.stringify(personalArray));
        toast.success("Personal details Added");
        history.push("/educationDetailsRegistration");
      }
    } else {
      let personalArray = {};
      for (let inputs in personalDetails) {
        personalArray[inputs] = personalDetails[inputs].value;
      }
      localStorage.setItem("personalDetails", JSON.stringify(personalArray));
      toast.success("Personal details Added");
      history.push("/educationDetailsRegistration");
    }
  };

  const checkInputvalidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isEmail) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = regex.test(value) && isValid;
    }

    if (rules.isPhone) {
      const regex = /^\d+$/;
      isValid = regex.test(value) && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  const onInputChangeHandler = (e, elementId) => {
    const updatedForm = { ...personalDetails };
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
    for (let inputElement in personalDetails) {
      formValid = personalDetails[inputElement].valid && formValid;
    }

    let password = personalDetails["password"].value;
    if (elementId === "confirmPassword") {
      if (password === e.target.value) {
        updateFormElement.valid = true;
        formValid = updatedForm[elementId].valid;
      } else {
        formValid = !updatedForm[elementId].valid;
        if (formValid === false) {
          updatedForm[elementId].valid = false;
        }
      }
    }
    setPersonalDetails(updatedForm);
    setIsFormValid(formValid);
  };
  let personalForm = [];
  for (let formelement in personalDetails) {
    personalForm.push({
      id: formelement,
      config: personalDetails[formelement],
    });
  }

  return (
    <div className={classes.logForm}>
      <h4>
        <span class="badge badge-info">Step : 1</span> Personal Details
      </h4>
      <form onSubmit={onSubmitPersonalDetails}>
        {personalForm.map((formelement) => {
          return (
            <Input
              key={formelement.id}
              valueType={formelement.id}
              elementType={formelement.config.elementType}
              elementConfig={formelement.config.elementConfig}
              value={formelement.config.value}
              isValid={!formelement.config.valid}
              touched={formelement.config.touched}
              changed={(e) => onInputChangeHandler(e, formelement.id)}
            />
          );
        })}
        <button
          style={{ width: "48%" }}
          type="button"
          className="btn btn-danger"
          onClick={onClickBackToLogin}
        >
          Back to login
        </button>
        <button
          style={{ width: "48%", marginLeft: "2%" }}
          type="submit"
          disabled={!isFormValid}
          className="btn btn-info"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default PersonalRegistration;
