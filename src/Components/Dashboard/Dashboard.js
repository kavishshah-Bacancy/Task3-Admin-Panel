import React, { useEffect, useState } from "react";

function Dashboard() {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    let activeUser = localStorage.getItem("activeUser");
    let userDetail = JSON.parse(localStorage.getItem("users"));
    for (let key in userDetail) {
      if (userDetail[key].user.email === activeUser) {
        setFirstName(userDetail[key].user["firstName"]);
        setLastName(userDetail[key].user["lastName"]);
      }
    }
  });
  return (
    <div>
      <p style={{ marginTop: "19%" }}>
        You logged in as {firstname} {lastName}
      </p>
    </div>
  );
}

export default Dashboard;
