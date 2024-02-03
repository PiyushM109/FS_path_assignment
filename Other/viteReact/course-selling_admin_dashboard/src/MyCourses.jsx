import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function MyCourses() {
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
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "10px",
          justifyContent: "center",
        }}
      >
        {courses.map((course) => (
          <Card
            key={course.id}
            sx={{ maxWidth: 345 }}
            style={{ margin: "10px" }}
          >
            <CardActionArea onClick={{}}>
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
                <Typography variant="body2" color="text.secondary">
                  ₹{course.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}
