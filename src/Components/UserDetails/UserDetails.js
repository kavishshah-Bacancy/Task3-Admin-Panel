/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import classes from "./UserDetails.module.css";

toast.configure();
function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState("");
  const [editPasswordFlag, setEditPasswordFlag] = useState(false);
  const [existingPassword, setExistingPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [userEmail, setUserEmail] = useState();
  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem("users"));
    let users = [];
    for (let key in userDetail) {
      users.push(userDetail[key].user);
    }
    setUserData(users);
    console.log(userData);
  }, []);

  const onInputChangeHandler = (e) => {
    if (e.target.name === "existingPassword") {
      if (e.target.value === "") {
        document.getElementById("expasswordError").innerHTML =
          "**Please Enter Existing password";
        document.getElementById("expasswordError").style.color = "red";
        document.getElementById("expasswordError").style.fontSize = "12px";
        document.getElementById("expasswordError").style.textAlign = "left";
      } else {
        document.getElementById("expasswordError").innerHTML = "";
      }
      setExistingPassword(e.target.value);
    }
    if (e.target.name === "newPassword") {
      if (e.target.value === "") {
        document.getElementById("passwordError").innerHTML =
          "**Please Enter New password";
        document.getElementById("passwordError").style.color = "red";
        document.getElementById("passwordError").style.fontSize = "12px";
        document.getElementById("passwordError").style.textAlign = "left";
      } else if (e.target.value.length < 8) {
        document.getElementById("passwordError").innerHTML =
          "**Password length must be 8-16 character long";
        document.getElementById("passwordError").style.color = "red";
        document.getElementById("passwordError").style.fontSize = "10px";
        document.getElementById("passwordError").style.textAlign = "left";
      } else {
        document.getElementById("passwordError").innerHTML = "";
      }
      setNewPassword(e.target.value);
    }
  };
  const onUpdatePassword = (e) => {
    e.preventDefault();
    console.log(password, " ", existingPassword, " ", newPassword);
    if (existingPassword !== password) {
      toast.error("Old password Does not match");
    } else {
      //let activeUser = localStorage.getItem("activeUser");
      let userDetail = JSON.parse(localStorage.getItem("users"));
      for (let key in userDetail) {
        if (userDetail[key].user.email === userEmail) {
          userDetail[key].user.password = newPassword;
        }
      }
      localStorage.removeItem("users");
      localStorage.setItem("users", JSON.stringify(userDetail));
      toast.info("Password updated successfully");
      setEditPasswordFlag(false);
      let users = [];
      for (let key in userDetail) {
        users.push(userDetail[key].user);
      }
      setUserData(users);
    }
  };

  let user = <p>Loading...</p>;

  if (userData !== null) {
    user = (
      <React.Fragment>
        {userData.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>
                <b>{item.email}</b>
              </td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
              <td>
                <button style={{ width: "auto" }} className="btn btn-success">
                  Edit Profile
                </button>
                <button
                  style={{ width: "auto" }}
                  onClick={() => {
                    setEditPasswordFlag(true);
                    setPassword(item.password);
                    setUserEmail(item.email);
                  }}
                  className="btn btn-info"
                >
                  Edit Password
                </button>
              </td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className={classes.card}>
        <table class="table">
          <thead
            class="thead-inverse"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>{user}</tbody>
        </table>
      </div>
      <Modal open={editPasswordFlag} onClose={() => setEditPasswordFlag(false)}>
        <div
          className="card"
          style={{
            padding: "30px 30px 30px 30px",
            boxSizing: "border-box",
            marginTop: "10%",
          }}
        >
          <form onSubmit={(e) => onUpdatePassword(e)}>
            <div className="form-group">
              <label htmlFor="inputAddress">Existing Password</label>
              <input
                style={{ padding: "20px 20px 20px 20px" }}
                type="password"
                className="form-control"
                placeholder="Please write your Exisiting password"
                name="existingPassword"
                required
                onChange={(e) => onInputChangeHandler(e)}
              />
              <p id="expasswordError"></p>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Please write your New password"
                name="newPassword"
                required
                onChange={(e) => onInputChangeHandler(e)}
              />
              <p id="passwordError"></p>
            </div>
            <button
              style={{ marginLeft: "20%", width: "200px" }}
              type="submit"
              className="btn btn-primary"
            >
              Update
            </button>
            <button
              style={{ marginLeft: "20%", width: "200px" }}
              type="button"
              onClick={() => setEditPasswordFlag(false)}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default UserDetails;
