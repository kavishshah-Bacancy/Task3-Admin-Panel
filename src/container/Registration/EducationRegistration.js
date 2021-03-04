import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../Components/Input/Input";
import classes from "./Registration.module.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCreate, MdCancel } from "react-icons/md";

toast.configure();
function EducationRegistration(props) {
  let history = useHistory();
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
        isPercentage: true,
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
  const [editIndex, setEditIndex] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(true);
  let educationForm = [];

  const onClickPrevious = () => {
    props.history.goBack();
  };
  const checkInputvalidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isPercentage) {
      let regex = /^([0-9]){1,2}(\.[0-9]{1,2})?$/;
      isValid = regex.test(value) && isValid;
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
      if (updateFormElement.value < educationDetails["startDate"].value) {
        educationDetails[elementId].valid = false;
      }
    }
    updateFormElement.touched = true;
    updatedForm[elementId] = updateFormElement;

    let formValid = true;
    for (let inputElement in educationDetails) {
      formValid = educationDetails[inputElement].valid && formValid;
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
    let id = Math.random();
    storedCurrentEduData["id"] = id;
    if (Object.keys(storedCurrentEduData).length !== 0) {
      setMultieducation([...multiEducation, storedCurrentEduData]);
    }
    for (let inputField in currentEduData) {
      currentEduData[inputField].value = "";
      currentEduData[inputField].valid = false;
      currentEduData[inputField].touched = false;
    }
    toast.success("Fields Added");
    setEducationDetails(currentEduData);
  };

  const onEdit = (index) => {
    setEditFlag(true);
    setAddFlag(false);
    setEditIndex(index);
    let currentEduData = { ...educationDetails };
    let editable = multiEducation[index];
    for (let inputField in editable) {
      if (inputField !== "id") {
        currentEduData[inputField].value = editable[inputField];
        currentEduData[inputField].valid = true;
        currentEduData[inputField].touched = false;
      }
    }
    setEducationDetails(currentEduData);
  };

  const updateEducation = () => {
    let editable = multiEducation[editIndex];
    let currentEduData = { ...educationDetails };
    let storedValue = {};
    for (let inputkey in currentEduData) {
      storedValue[inputkey] = currentEduData[inputkey].value;
    }

    for (let key in storedValue) {
      editable[key] = storedValue[key];
    }
    multiEducation[editIndex] = editable;
    setMultieducation(multiEducation);
    setEditFlag(false);
    setAddFlag(true);
    for (let inputField in currentEduData) {
      currentEduData[inputField].value = "";
      currentEduData[inputField].valid = false;
      currentEduData[inputField].touched = false;
    }
    toast.info("Fields Updated");
    setEducationDetails(currentEduData);
  };

  const onDelete = (index) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let updatedEduDetail = [...multiEducation];
            updatedEduDetail.splice(index, 1);
            setMultieducation(updatedEduDetail);
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
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
    if (localStorage.getItem("users")) {
      let users = JSON.parse(localStorage.getItem("users"));
      let combinedArr = [...users, ...userArray];
      localStorage.setItem("users", JSON.stringify(combinedArr));
      localStorage.removeItem("personalDetails");
      toast.info("Account Created");
      history.push("/");
    } else {
      localStorage.setItem("users", JSON.stringify(userArray));
      toast.info("Account Created");
      localStorage.removeItem("personalDetails");
      history.push("/");
    }
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
          <div style={{ marginTop: "30%" }}>
            <button
              style={{ width: "48%", padding: "10px 10px 10px 10px" }}
              type="button"
              id="pre"
              className="btn btn-danger"
              onClick={onClickPrevious}
            >
              Previous
            </button>
            {addFlag ? (
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
            ) : (
              <button
                style={{
                  marginLeft: "5%",
                  width: "48%",
                  padding: "10px 10px 10px 10px",
                }}
                type="button"
                className="btn btn-success"
                onClick={updateEducation}
                disabled={!isFormValid}
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
      <div>
        {multiEducation.length > 0 ? (
          <Fragment>
            <div className={classes.Educard}>
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
                  {multiEducation.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.Institute}</td>
                        <td>{item.stream}</td>
                        <td>{item.percentage}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => onEdit(index)}
                            style={{
                              height: "5%",
                              width: "30%",
                            }}
                          >
                            <MdCreate />
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => onDelete(index)}
                            style={{
                              marginLeft: "2%",
                              height: "5%",
                              width: "30%",
                            }}
                          >
                            <MdCancel />
                          </button>
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
            </div>
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
}

export default EducationRegistration;
