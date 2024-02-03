import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Appbar from "./Appbar";
import SignIn from "./SignIn";
import DashBoard from "./DashBoard";
import AddCourse from "./AddCourse";
import MyCourses from "./MyCourses";
import Course from "./Course";

function App() {
  return (
    <>
      <Router>
        <Appbar />

        <Routes>
          <Route path="/Courses" element={<MyCourses />} />
          <Route path="/Course/:courseId" element={<Course />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

      {/* <SignUp></SignUp>
      <SignIn></SignIn> */}
    </>
  );
}

export default App;
