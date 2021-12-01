import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
const SignUp = () => {
  const [Credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertseverity, setalertseverity] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Credentials.name,
        email: Credentials.email,
        password: Credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setAlertContent("Account Created Successfully");
      setalertseverity("success");
      setAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setAlertContent(json.errors[0].msg);
      setalertseverity("error");
      setAlert(true);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {alert ? <Alert severity={alertseverity}>{alertContent}</Alert> : <></>}
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          >
          <h2>Create Your Account</h2>
          <TextField
            sx={{ mt: 3, width: 1 / 3 }}
            required
            label="name"
            onChange={onChange}
            name="name"
            value={Credentials.name}
          />
          <TextField
            sx={{ mt: 3, width: 1 / 3 }}
            required
            label="email"
            type="email"
            onChange={onChange}
            name="email"
            value={Credentials.email}
          />
          <TextField
            sx={{ mt: 3, width: 1 / 3 }}
            required
            label="password"
            type="password"
            onChange={onChange}
            name="password"
            value={Credentials.password}
          />
          <Button
            sx={{ mt: 3, width: 1 / 3 }}
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;
