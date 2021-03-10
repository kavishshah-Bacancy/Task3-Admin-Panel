import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import classes from "./EducationDetails.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function EducationDetails() {
  const [userEducationInfo, setUserEducationInfo] = useState([]);
  const [userEducationInfo1, setUserEducationInfo1] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [endDateFlag, setEndDateFlag] = useState(true);
  const [editIndex, setIndex] = useState();
  const [updatedUserEducationInfo, setUpdatedUserEducationInfo] = useState({});
  useEffect(() => {
    let edu = [];
    let finaledu = [];
    let userDetail = JSON.parse(localStorage.getItem("users"));
    for (let key in userDetail) {
      for (let edkey in userDetail[key].education) {
        edu.push(userDetail[key].education[edkey]);
      }
      finaledu.push({
        edu: edu,
        name: `${userDetail[key].user["firstName"]} ${userDetail[key].user["lastName"]}`,
      });
      edu = [];
    }
    console.log(finaledu);
    setUserEducationInfo1(finaledu);
    setUserEducationInfo(edu);
  }, []);
  const onDelete = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let userDetail = JSON.parse(localStorage.getItem("users"));
            for (let key in userDetail) {
              for (let edkey in userDetail[key].education) {
                if (userDetail[key].education[edkey].id === id) {
                  userDetail[key].education.splice(edkey, 1);
                }
              }
            }

            localStorage.removeItem("users");
            localStorage.setItem("users", JSON.stringify(userDetail));
            let edu = [];
            let finaledu = [];
            for (let key in userDetail) {
              for (let edkey in userDetail[key].education) {
                edu.push(userDetail[key].education[edkey]);
              }
              finaledu.push({
                edu: edu,
                name: userDetail[key].user["firstName"],
              });
              edu = [];
            }
            console.log(finaledu);
            setUserEducationInfo1(finaledu);
            toast.warning("Fields Deleted successfully");
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

  const onEdit = (index) => {
    console.log(index);
    setIndex(index);
    let userDetail = JSON.parse(localStorage.getItem("users"));
    for (let key in userDetail) {
      for (let edkey in userDetail[key].education) {
        console.log(edkey);
        if (userDetail[key].education[edkey].id === index) {
          setUpdatedUserEducationInfo(userDetail[key].education[edkey]);
        }
      }
    }
    setEditFlag(true);
  };

  const onChangeInputHandler = (e) => {
    if (e.target.name === "startDate") {
      if (e.target.value === "") {
        document.getElementById("stdate").innerHTML =
          "**Please Choose Start date";
        document.getElementById("stdate").style.color = "red";
        document.getElementById("stdate").style.fontSize = "15px";
        document.getElementById("stdate").style.textAlign = "left";
      } else {
        setEndDateFlag(false);
        document.getElementById("stdate").innerHTML = "";
      }
    }
    if (e.target.name === "endDate") {
      if (e.target.value === "") {
        document.getElementById("endate").innerHTML =
          "**Please Choose end date";
        document.getElementById("stdate").style.color = "red";
        document.getElementById("stdate").style.fontSize = "15px";
        document.getElementById("stdate").style.textAlign = "left";
      } else {
        setEndDateFlag(false);
        document.getElementById("stdate").innerHTML = "";
      }
    }
    if (e.target.name === "Institute" && e.target.value === "") {
      document.getElementById("ins").innerHTML =
        "**Please write Institute name";
      document.getElementById("ins").style.color = "red";
      document.getElementById("ins").style.fontSize = "15px";
      document.getElementById("ins").style.textAlign = "left";
    } else {
      document.getElementById("ins").innerHTML = "";
    }

    if (e.target.name === "stream" && e.target.value === "") {
      document.getElementById("str").innerHTML = "**Please write Stream/Course";
      document.getElementById("str").style.color = "red";
      document.getElementById("str").style.fontSize = "15px";
      document.getElementById("str").style.textAlign = "left";
    } else {
      document.getElementById("str").innerHTML = "";
    }

    if (e.target.name === "percentage" && e.target.value === "") {
      document.getElementById("str").innerHTML = "**Please write Stream/Course";
      document.getElementById("str").style.color = "red";
      document.getElementById("str").style.fontSize = "15px";
      document.getElementById("str").style.textAlign = "left";
    } else {
      document.getElementById("str").innerHTML = "";
    }
    setUpdatedUserEducationInfo({
      ...updatedUserEducationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    setEndDateFlag(true);
    let userDetail = JSON.parse(localStorage.getItem("users"));
    for (let key in userDetail) {
      for (let edkey in userDetail[key].education) {
        console.log(edkey);
        if (userDetail[key].education[edkey].id === editIndex) {
          userDetail[key].education[edkey] = updatedUserEducationInfo;
        }
      }
    }
    localStorage.removeItem("users");
    localStorage.setItem("users", JSON.stringify(userDetail));
    let edu = [];
    let finaledu = [];
    for (let key in userDetail) {
      for (let edkey in userDetail[key].education) {
        edu.push(userDetail[key].education[edkey]);
      }
      finaledu.push({ edu: edu, name: userDetail[key].user["firstName"] });
      edu = [];
    }
    console.log(finaledu);
    setUserEducationInfo1(finaledu);
    toast.success("Details Updated Successfully");
    setEditFlag(false);
  };

  return (
    <div>
      <div className={classes.card}>
        {userEducationInfo1.map((item) => {
          return (
            <React.Fragment>
              <p style={{ fontSize: "25px" }}>{item.name}</p>
              <table className="table">
                <thead
                  class="thead-inverse"
                  style={{ backgroundColor: "whitesmoke" }}
                >
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
                  {item.edu.length !== 0 ? (
                    item.edu.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.Institute}</td>
                          <td>{item.stream}</td>
                          <td>{item.percentage}</td>
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
                          <td>
                            <button
                              onClick={() => onEdit(item.id)}
                              className="btn btn-info"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(item.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <td colSpan="5">
                      <p
                        style={{
                          fontSize: "17px",
                          marginLeft: "14%",
                          color: "lightsalmon",
                        }}
                      >
                        Education Details Not Available
                      </p>
                    </td>
                  )}
                </tbody>
              </table>
            </React.Fragment>
          );
        })}
        {/* <table class="table">
          <thead
            class="thead-inverse"
            style={{ backgroundColor: "whitesmoke" }}
          >
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
            {userEducationInfo.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Institute}</td>
                  <td>{item.stream}</td>
                  <td>{item.percentage}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>
                    <button
                      onClick={() => onEdit(item.id)}
                      className="btn btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      </div>
      <Modal open={editFlag} onClose={() => setEditFlag(false)}>
        <div
          className="card"
          style={{
            padding: "20px 20px 20px 20px",
            boxSizing: "border-box",
            marginTop: "10%",
          }}
        >
          <form onSubmit={onUpdate}>
            <div className="form-group">
              <label htmlFor="inputAddress">Institute Name</label>
              <input
                type="text"
                className="form-control"
                value={updatedUserEducationInfo.Institute}
                placeholder="Institute Name"
                name="Institute"
                required
                onChange={(e) => onChangeInputHandler(e)}
              />
              <p id="ins"></p>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Stream</label>
              <input
                type="text"
                className="form-control"
                value={updatedUserEducationInfo.stream}
                name="stream"
                placeholder="Stream / Course"
                required
                onChange={(e) => onChangeInputHandler(e)}
              />
              <p id="str"></p>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Percentage / CGPA</label>
              <input
                type="number"
                className="form-control"
                value={updatedUserEducationInfo.percentage}
                name="percentage"
                required
                placeholder="Enter your percentage/ CPI"
                onChange={(e) => onChangeInputHandler(e)}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Start Date</label>
                <input
                  type="Date"
                  className="form-control"
                  value={updatedUserEducationInfo.startDate}
                  placeholder="Email"
                  name="startDate"
                  required
                  id="startDate"
                  onChange={(e) => onChangeInputHandler(e)}
                />
                <p id="stdate"></p>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">End Date</label>
                <input
                  type="Date"
                  className="form-control"
                  value={updatedUserEducationInfo.endDate}
                  placeholder="Password"
                  name="endDate"
                  min={updatedUserEducationInfo.startDate}
                  required
                  onChange={(e) => onChangeInputHandler(e)}
                />
                <p id="endate"></p>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                setEditFlag(false);
                setEndDateFlag(true);
              }}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default EducationDetails;
