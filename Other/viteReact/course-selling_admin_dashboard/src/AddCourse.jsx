import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

function AddCourse() {
  let navigate = useNavigate();
  let [courseData, setCourseData] = new useState({
    title: "",
    desc: "",
    price: 0,
    published: false,
  });
  let handleSubmit = (event) => {
    const url = "http://localhost:3000/admin/courses";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(courseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Response:", responseData);
        navigate("/Courses");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    event.preventDefault();
    setCourseData({
      title: "",
      desc: "",
      image: "",
      price: 0,
      published: true,
    });
  };
  let handleCourse = (event) => {
    setCourseData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "80px",
        }}
      >
        <Card
          style={{
            width: "500px",
            padding: "0 2rem 2rem 2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3>Add New Course</h3>
          </div>
          <div>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="title"
              variant="outlined"
              value={courseData.title}
              onChange={handleCourse}
              name="title"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Description"
              type={"text"}
              value={courseData.desc}
              variant="outlined"
              onChange={handleCourse}
              name="desc"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Price"
              type={"number"}
              value={courseData.price}
              variant="outlined"
              onChange={handleCourse}
              name="price"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Image-Link"
              type={"text"}
              value={courseData.image}
              variant="outlined"
              onChange={handleCourse}
              name="image"
            />
            <br />
            <br />
          </div>
          <br />
          <br />
          <div>
            <Button size="large" variant="contained" onClick={handleSubmit}>
              Add Course
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
