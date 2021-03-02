import React, { Fragment } from "react";
import classes from "./Input.module.css";

function Input(props) {
  let inputElement = null;
  let validationError = null;
  let inputClass = [classes.InputElement];

  if (props.isValid && props.touched) {
    console.log("Error");
    inputClass.push(classes.Invalid);
    validationError = (
      <h5
        style={{ color: "red", fontSize: "10px", textTransform: "capitalize" }}
      >
        Please Enter {props.valueType}
      </h5>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <React.Fragment>
          <input
            className={inputClass.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {validationError}
        </React.Fragment>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    case "date":
      inputElement = (
        <Fragment>
          <label>{props.label}</label>
          <input
            type="date"
            className={inputClass.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            onfocus="(this.type='date')"
          />
        </Fragment>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
