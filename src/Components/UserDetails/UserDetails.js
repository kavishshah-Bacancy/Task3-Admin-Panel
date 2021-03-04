/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { ModalBody } from "react-bootstrap";
import "./UserDetails.css";
import img from "../../assets/profile.png";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { MdDialerSip } from "react-icons/md";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";

toast.configure();
function UserDetails() {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editPasswordFlag, setEditPasswordFlag] = useState(false);
  const [existingPassword, setExistingPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [updateBtnFlag, setUpdateBtnFlag] = useState(true);
  useEffect(() => {
    let activeUser = localStorage.getItem("activeUser");
    let userDetail = JSON.parse(localStorage.getItem("users"));
    for (let key in userDetail) {
      if (userDetail[key].user.email === activeUser) {
        setFirstName(userDetail[key].user["firstName"]);
        setLastName(userDetail[key].user["lastName"]);
        setEmail(userDetail[key].user["email"]);
        setPhone(userDetail[key].user["phone"]);
        setGender(userDetail[key].user["gender"]);
        setPassword(userDetail[key].user["password"]);
      }
    }
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
    if (existingPassword !== password) {
      toast.error("Old password Does not match");
    } else {
      let activeUser = localStorage.getItem("activeUser");
      let userDetail = JSON.parse(localStorage.getItem("users"));
      for (let key in userDetail) {
        if (userDetail[key].user.email === activeUser) {
          userDetail[key].user.password = newPassword;
        }
      }
      localStorage.removeItem("users");
      localStorage.setItem("users", JSON.stringify(userDetail));
      toast.info("Password updated successfully");
      setEditPasswordFlag(false);
    }
  };
  return (
    <React.Fragment>
      <div style={{ marginTop: "5%" }}>
        <div class="col-md-4 mt-4" style={{ marginLeft: "30%" }}>
          <div class="card profile-card-4">
            <div class="card-body pt-5">
              <img src={img} alt="profile-image" class="profile" />
              <h5 class="card-title text-center">
                {firstname} {lastName}
              </h5>
              <p class="card-text text-center">
                <BsFillEnvelopeFill /> <span>{email}</span>
              </p>
              <p class="card-text text-center">
                <MdDialerSip /> : <span>{phone}</span>
              </p>
              <p class="card-text text-center">
                Gender : <span>{gender}</span>
              </p>
              <button className="btn btn-success">Edit Profile</button>
              <button
                onClick={() => setEditPasswordFlag(true)}
                className="btn btn-info"
              >
                Edit Password
              </button>
            </div>
          </div>
        </div>
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
              disabled={updateBtnFlag}
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
