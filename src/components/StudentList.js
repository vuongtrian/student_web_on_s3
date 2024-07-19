import { useEffect, useState } from "react";
import axios from "axios";
import "../main.css";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchStudents = () => {
      axios
        // .get("http://127.0.0.1:8000/api/students/")
        .get("http://18.118.187.254:8000/api/students/")
        .then((response) => {
          setStudents(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setHttpError(error.message);
        });
    };

    fetchStudents();
  }, []);

  const handleDelete = (studentId) => {
    axios
      // .delete(`http://127.0.0.1:8000/api/students/${studentId}/`)
      .delete(`http://18.118.187.254:8000/api/students/${studentId}/`)
      .then(() => {
        setStudents(students.filter((student) => student.id !== studentId));
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  if (isLoading) {
    return (
      <section className="loading">
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className="error">
        <p>{httpError}</p>
      </section>
    );
  }

  const studentList = students.map((student) => (
    <tr key={student.id}>
      <td>{student.first_name}</td>
      <td>{student.last_name}</td>
      <td>{student.age}</td>
      <td>{student.gender}</td>
      <td>{student.grade}</td>
      <td>{student.address}</td>
      <td>{student.contact_number}</td>
      <td>
        <Link to={`/students/edit/${student.id}`}>
          <button className="update">Update</button>
        </Link>
        <button onClick={() => handleDelete(student.id)} className="delete">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <Link to="/students/add">
        <button className="add">Add New Student</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Grade</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{studentList}</tbody>
      </table>
    </>
  );
}

export default StudentList;
