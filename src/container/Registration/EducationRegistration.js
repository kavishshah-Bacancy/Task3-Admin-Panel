import React, { Fragment, useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import classes from "./Registration.module.css";

function EducationRegistration() {
  const [educationDetails, setEducationDetails] = useState({
    Institute: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your Institute Name",
        name: "Institute",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    stream: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your Stream",
        name: "Stream",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    percentage: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please Enter your Percentage/CGPA",
        name: "percentage",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    startDate: {
      label: "Start Date",
      elementType: "input",
      elementConfig: {
        type: "Date",
        name: "Start Date",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    endDate: {
      label: "End Date",
      elementType: "Input",
      elementConfig: {
        type: "Date",
        name: "End Date",
      },
      value: "",
      validation: {
        required: true,
        checkDate: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [multiEducation, setMultieducation] = useState([]);
  let educationForm = [];

  const checkInputvalidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  };

  const onInputChangeHandler = (e, elementId) => {
    const updatedForm = { ...educationDetails };
    const updateFormElement = {
      ...updatedForm[elementId],
    };
    updateFormElement.value = e.target.value;
    updateFormElement.valid = checkInputvalidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    if (elementId === "endDate") {
      if (educationDetails[elementId].value !== "")
        console.log(educationDetails[elementId].valid);
      educationDetails[elementId].valid = true;
    }
    updateFormElement.touched = true;
    updatedForm[elementId] = updateFormElement;

    let formValid = true;
    for (let inputElement in educationDetails) {
      formValid = educationDetails[inputElement].valid && formValid;
      console.log(inputElement, " ", educationDetails[inputElement].valid);
    }
    if (e.target.value.trim() === "") {
      formValid = false;
    }
    setEducationDetails(updatedForm);
    setIsFormValid(formValid);
  };

  const addMoreEducation = () => {
    setIsFormValid(false);
    const currentEduData = { ...educationDetails };
    let storedCurrentEduData = {};
    for (let inputField in currentEduData) {
      storedCurrentEduData[inputField] = currentEduData[inputField].value;
    }
    console.log(storedCurrentEduData);
    if (Object.keys(storedCurrentEduData).length !== 0) {
      setMultieducation([...multiEducation, storedCurrentEduData]);
    }
    console.log(multiEducation);
    for (let inputField in currentEduData) {
      currentEduData[inputField].value = "";
      currentEduData[inputField].valid = false;
      currentEduData[inputField].touched = false;
    }
    console.log(currentEduData);
    setEducationDetails(currentEduData);
  };

  const registerUserHandler = () => {
    let userArray = [];
    let userPersonalDetails = JSON.parse(
      localStorage.getItem("personalDetails")
    );
    let userEducationDetails = multiEducation;
    userArray.push({
      user: userPersonalDetails,
      education: userEducationDetails,
    });
    console.log(userArray);
    localStorage.setItem("users", JSON.stringify(userArray));
  };

  for (let formelement in educationDetails) {
    educationForm.push({
      id: formelement,
      config: educationDetails[formelement],
    });
  }

  return (
    <Fragment>
      <div className={classes.logForm}>
        <h4>
          <span class="badge badge-info">Step : 2</span> Education Details
        </h4>
        <form>
          {educationForm.map((formelement) => {
            console.log(formelement.config.value);
            return (
              <Input
                key={formelement.id}
                valueType={formelement.id}
                elementType={formelement.config.elementType}
                elementConfig={formelement.config.elementConfig}
                value={formelement.config.value}
                label={formelement.config.label}
                isValid={!formelement.config.valid}
                touched={formelement.config.touched}
                changed={(e) => onInputChangeHandler(e, formelement.id)}
              />
            );
          })}
          <button
            style={{ width: "48%", padding: "10px 10px 10px 10px" }}
            type="button"
            id="pre"
            className="btn btn-danger"
          >
            Previous
          </button>
          <button
            style={{
              marginLeft: "5%",
              width: "48%",
              padding: "10px 10px 10px 10px",
            }}
            type="button"
            className="btn btn-success"
            onClick={addMoreEducation}
            disabled={!isFormValid}
          >
            Add more
          </button>
        </form>
      </div>
      <div>
        {multiEducation.length > 0 ? (
          <Fragment>
            <table class="table">
              <thead class="thead-inverse">
                <tr>
                  <th>School/University Name</th>
                  <th>Stream</th>
                  <th>Percebtage/CGPA</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {multiEducation.map((item) => {
                  return (
                    <tr>
                      <td>{item.Institute}</td>
                      <td>{item.stream}</td>
                      <td>{item.percentage}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              style={{ width: "100%", marginTop: "-1%" }}
              onClick={registerUserHandler}
              type="submit"
              className="btn btn-info"
            >
              Register now
            </button>
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
}

export default EducationRegistration;
