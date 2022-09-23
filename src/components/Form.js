import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "./Auth";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import './Form.css'
import CircularStatic from "../progress";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initalState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [FormData, setFormData] = useState(initalState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [FormErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [alertt, setAlertt] = useState(false);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  const BasicAlerts = (props) => {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="warning">Something is wrong</Alert>
      </Stack>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (isSignUp) {
      try {
        setFormErrors(validate(FormData));

        const data = await signUp(FormData);

        setIsSubmit(true);
        dispatch({ type: "GET_USER_AUTH", data });
        setIsSignUp(false);
      } catch (error) {
        setAlertt(true);
        setAlert(error.response.data.message);

        setTimeout(() => {
          setAlertt(false);
        }, 3000);
      }
    } else {
      try {
        const data = await signIn(FormData);
        setFormErrors(validate(FormData));
        dispatch({type: "GET_USER_AUTH", data});
        
        navigate("/home");
        
      } catch (error) {
        setAlertt(true);
        setAlert(error.response.data.message);
        setTimeout(() => {
          setAlertt(false);
        }, 3000);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.firstName) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.lastName = "Last Name is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.password = "Password must be more than 4 characters!";
    }
    if (!values.email) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.email = "This is not a valid Email!";
    }
    if (!values.phone) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.phone = "Phone Number is required!";
    }
    if (!values.confirmPassword) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.confirmPassword = "Confrirm Password is required!";
    } else if (values.confirmPassword !== values.password) {
      setErr(true);

      setTimeout(() => {
        setErr(false);
      }, 5000);
      errors.confirmPassword = "Password do not match!";
    }
    return errors;
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    
    const name = e.target.name;
    if (e.target.value.length > 0) {
    }
    setFormData({ ...FormData, [name]: e.target.value });
  };

  const switchMode = () => [setIsSignUp((prevIsSignUp) => !prevIsSignUp)];

  useEffect(() => {
    const user = localStorage.getItem("profile");
    if (!user) {
      setIsSignUp(true);
    }

    if (Object.keys(FormErrors).length === 0 && isSubmit) {
    }
  }, [FormErrors]);

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <Grid className="area" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
       <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
     {!isLoading ? <Paper elevation={20} style={paperStyle} >
      

       <form onSubmit={handleSubmit} style={{ textAlign: "center" }} className='login-box'>
          {isSignUp && (
            <>
              <TextField
                type="text"
                name="firstName"
                fullWidth
                label="First Name"
                variant="standard"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              {err && (
                <p style={{ textAlign: "initial", color: "red", fontSize: 12 }}>
                  {FormErrors.firstName}
                </p>
              )}
              <TextField
                type="text"
                name="lastName"
                fullWidth
                label="Last Name"
                variant="standard"
                placeholder="Enter your name"
                onChange={handleChange}
              />
              {err && (
                <p style={{ textAlign: "initial", color: "red", fontSize: 12 }}>
                  {FormErrors.lastName}
                </p>
              )}

              <TextField
                type="text"
                name="phone"
                fullWidth
                label="Phone Number"
                variant="standard"
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
              {err && (
                <p style={{ textAlign: "initial", color: "red", fontSize: 12 }}>
                  {FormErrors.phone}
                </p>
              )}
            </>
          )}
          <TextField
            type="email"
            name="email"
            fullWidth
            label="Email"
            variant="standard"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          {err && (
            <p style={{ textAlign: "initial", color: "red", fontSize: 12 }}>
              {FormErrors.email}
            </p>
          )}

          <TextField
            type="password"
            name="password"
            fullWidth
            label="Password"
            variant="standard"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          {err && (
            <p style={{ textAlign: "initial", color: "red", fontSize: 12 }}>
              {FormErrors.password}
            </p>
          )}

          {isSignUp && (
            <TextField
              type="password"
              name="confirmPassword"
              fullWidth
              label="Confirm Passoword"
              variant="standard"
              placeholder="Confirm your password"
              onChange={handleChange}
            />
          )}
          {err && isSignUp && (
            <p style={{ textAlign: "initial", color: "red", fontSize: 12 }}>
              {FormErrors.confirmPassword}
            </p>
          )}

          <Button
            style={{ marginTop: 20 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? <p style={{color: '#1976d2'}}>Already have an account? Sign In</p>
                  : <p style={{color: '#1976d2'}}>Don't have an account? Sign Up</p>}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>: <CircularStatic />}
    </Grid>
  );
};

export default SignUp;
