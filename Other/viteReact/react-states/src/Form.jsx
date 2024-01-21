import { useState } from "react";

export default function Form() {
  let [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: ""
  });

  //   let handlenameChange = (event) => {
  //     // console.log(event.target.value);
  //     setFullName(event.target.value);
  //   };
  //   let handleusername = (event) => {
  //     // console.log(event.target.value);
  //     setUserName(event.target.value);
  //   };

  let handleInputChange = (event) => {
    let fieldname = event.target.name;
    let newValue = event.target.value;
    setFormData((currData) => {
      currData[fieldname] = newValue;
      return { ...currData };
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      fullName: "",
      userName: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullname">Full name</label>
      <input
        id="fullname"
        type="text"
        placeholder="Enter Full Name"
        value={formData.fullName}
        onChange={handleInputChange}
        name="fullName"
      />
      <br />
      <label htmlFor="username">User name</label>
      <input
        id="username"
        type="text"
        placeholder="Enter User Name"
        value={formData.userName}
        onChange={handleInputChange}
        name="userName"
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleInputChange}
        name="password"
      />
      <br />
      <button>Submit</button>
    </form>
  );
}
