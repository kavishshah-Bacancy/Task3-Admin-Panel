/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { ModalBody } from "react-bootstrap";
import "./UserDetails.css";
import img from "../../assets/profile.png";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { MdDialerSip } from "react-icons/md";
import Modal from "react-responsive-modal";

function UserDetails() {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [editProfileFlag, setEditProfileFlag] = useState(false);
  const [editPasswordFlag, setEditPasswordFlag] = useState(false);

  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem("users"));
    setFirstName(userDetail[0].user["firstName"]);
    setLastName(userDetail[0].user["lastName"]);
    setEmail(userDetail[0].user["email"]);
    setPhone(userDetail[0].user["phone"]);
    setGender(userDetail[0].user["gender"]);
  }, []);
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
              <button
                onClick={() => setEditProfileFlag(true)}
                className="btn btn-success"
              >
                Edit Profile
              </button>
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
          <form>
            <div className="form-group">
              <label htmlFor="inputAddress">Existing Password</label>
              <input
                style={{ padding: "20px 20px 20px 20px" }}
                type="text"
                className="form-control"
                placeholder="Please write your Exisiting password"
                name="existingPassword"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">New Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="Please write your New password"
                name="newPassword"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
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
