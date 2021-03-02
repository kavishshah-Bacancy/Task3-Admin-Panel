import React from "react";

function EducationDetails() {
  return (
    <div>
      <table class="table">
        <thead class="thead-inverse">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>School/University Name</th>
            <th>Stream</th>
            <th>Percebtage/CGPA</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>C. N Vidyalaya</td>
            <td>Commerce</td>
            <td>86%</td>
            <td>01-05-2015</td>
            <td>01-03-2016</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>C. N Vidyalaya</td>
            <td>Commerce</td>
            <td>86%</td>
            <td>01-05-2015</td>
            <td>01-03-2016</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EducationDetails;
