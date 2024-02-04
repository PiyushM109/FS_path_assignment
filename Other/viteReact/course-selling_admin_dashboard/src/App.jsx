import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Appbar from "./Appbar";
import SignIn from "./SignIn";
import DashBoard from "./DashBoard";
import AddCourse from "./AddCourse";
import MyCourses from "./MyCourses";
import UpdateCourse from "./UpdateCourse";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Appbar />

          <Routes>
            <Route path="/Courses" element={<MyCourses />} />
            <Route path="/Course/:courseId" element={<UpdateCourse />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </RecoilRoot>
      {/* <SignUp></SignUp>
      <SignIn></SignIn> */}
    </>
  );
}

export default App;
