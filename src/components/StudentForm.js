import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../main.css";
function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    grade: "",
    address: "",
    contact_number: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  //3.14.68.126
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchStudent = async () => {
        try {
          const response = await axios.get(
            // `http://127.0.0.1:8000/api/students/${id}/`
            `http://18.118.187.254:8000/api/students/${id}/`
          );
          setFormData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, formData);
        await axios.put(
          `http://18.118.187.254:8000/api/students/${id}/`,
          formData
        );
      } else {
        // await axios.post("http://127.0.0.1:8000/api/students/", formData);
        await axios.post("http://18.118.187.254:8000/api/students/", formData);
      }
      navigate("/students");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Grade</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">{isEdit ? "Update" : "Add"}</button>
          <Link to="/students">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
