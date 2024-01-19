import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

function SignUp() {
  let [email, setEmail] = useState();
  let [pass, setPass] = useState();

  let updateEmail = (event) => {
    setEmail(event.target.value);
  };
  let updatePass = (event) => {
    setPass(event.target.value);
  };

  let signUp = () => {
    let currEmail = email;
    let currPass = pass;
    setEmail("");
    setPass("");
    const url = "http://localhost:3000/admin/signup";

    const data = {
      username: currEmail,
      password: currPass,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        
      },
      body: JSON.stringify(data), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
      })
      .then((data) => {
        console.log("Response:", data);
        localStorage.setItem("token",data.token);
        console.log(localStorage.getItem("token"));
        
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
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
            <h3>Welcome To PathShala</h3>
          </div>
          <div>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={updateEmail}
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Password"
              type={"password"}
              value={pass}
              variant="outlined"
              onChange={updatePass}
            />
          </div>
          <br />
          <br />
          <div>
            <Button size="large" variant="contained" onClick={signUp}>
              SignUp
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
