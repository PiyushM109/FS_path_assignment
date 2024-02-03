import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Appbar() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    function callback2(data) {
      if (data.username) {
        setUserEmail(data.username);
      }
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);
  if (userEmail) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography variant="h5">PathShala📚</Typography>
        </div>
        <div>
          <span>{userEmail}</span>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              window.location = "/signin";
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant="h4">PathShala📚</Typography>
      </div>
      <div>
        <Button
          style={{ marginRight: "1rem" }}
          variant="contained"
          onClick={() => {
            // window.location="/signup"
            navigate("/signup");
          }}
        >
          SignUp
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // window.location="/signin"
            navigate("/signin");
          }}
        >
          SignIn
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
