import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Grid } from "@mui/material";
const Login = () => {
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertseverity, setalertseverity] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Credentials.email,
        password: Credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setAlertContent("Welcome Back");
      setalertseverity("success");
      setAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setAlertContent(json.error[0].msg);
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
          <h2>Log in to your account</h2>
          <TextField
            sx={{ mt: 3, width: 1 / 3 }}
            required
            id="filled-required"
            label="Email"
            name="email"
            type="email"
            variant="filled"
            value={Credentials.email}
            onChange={onChange}
          />
          <TextField
            sx={{ m: 3, width: 1 / 3 }}
            required
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            name="password"
            value={Credentials.password}
            onChange={onChange}
          />

          <Button sx={{ width: 1 / 7 }} type="submit" variant="contained">
            Login
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
