import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Appbar from "./Appbar";
import SignIn from "./SignIn";
import DashBoard from "./DashBoard";

function App() {
  return (
    <>
      <Router>
        <Appbar />

        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
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
