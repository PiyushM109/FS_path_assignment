import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import SignUp from "./SignUp"
import Appbar from "./Appbar"
import SignIn from "./SignIn"



function App() {
  return (
    <>
      <Appbar></Appbar>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      
      {/* <SignUp></SignUp>
      <SignIn></SignIn> */}
    </>
  )
}

export default App
