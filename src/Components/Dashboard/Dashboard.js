import React, { useEffect, useState } from "react";

function Dashboard() {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    let userDetail = JSON.parse(localStorage.getItem("users"));
    setFirstName(userDetail[0].user["firstName"]);
    setLastName(userDetail[0].user["lastName"]);
  });
  return (
    <div>
      <p>
        You logged in as {firstname} {lastName}
      </p>
    </div>
  );
}

export default Dashboard;
