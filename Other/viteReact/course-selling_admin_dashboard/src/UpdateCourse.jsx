import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function UpdateCourse() {
  let { courseId } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  let course;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>Not Found</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "80px",
      }}
    >
      <CourseCard course={course} />
      <UpdateCard courses={courses} course={course} setCourses={setCourses}/>
    </div>
  );
}

function UpdateCard(props) {
  const course = props.course;
  let [courseData, setCourseData] = new useState(course);
  
  let handleCourse = (event) => {
    setCourseData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };
  return (
    <Card
      style={{
        width: "500px",
        padding: "0 2rem 2rem 2rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography>Update Course details</Typography>
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
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            const url = "http://localhost:3000/admin/courses/" + course.id;
            fetch(url, {
              method: "PUT",
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
              .then(() => {
                // alert("Course Updated", responseData);
                const courses = props.courses;
                let updatedCourses = [];
                for(let i=0; i<courses.length; i++){
                    if(courses[i].id==course.id){
                        updatedCourses.push({
                            id : course.id,
                            title : courseData.title,
                            published:course.published,
                            desc : courseData.desc,
                            price : courseData.price,
                            image : courseData.image,
                        })
                    }else{
                        updatedCourses.push(courses[i]);
                    }
                }
                console.log(updatedCourses);
                props.setCourses(updatedCourses);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}
        >
          Update Course
        </Button>
      </div>
    </Card>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <Card key={course.id} sx={{ maxWidth: 345 }} style={{ margin: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={course.image}
          alt="course thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography>{course.desc}</Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{course.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default UpdateCourse;

