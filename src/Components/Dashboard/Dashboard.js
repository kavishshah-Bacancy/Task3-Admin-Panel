import React from "react";

function Dashboard() {
  return (
    <div>
      <p>You logged in as {localStorage.getItem("firstname")}</p>
    </div>
  );
}

export default Dashboard;
