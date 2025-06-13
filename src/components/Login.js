import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import {DataContext} from "../App"

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Snackbar State
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const {setIsLoggedIn,setCurrentUser} = useContext(DataContext);

  // Handle Snackbar Close
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  let checkLogin = (data) => {
    let getUser = async () => {
      try {
        let response = await axios.get("http://localhost:5000/users?emailid=" + data.emailid);
        if (response.data.length > 0 && response.data[0].password === data.password && response.data[0].emailid === data.emailid ) {
          let currentUser = response.data[0];

          // Show Success Snackbar
          setSnackbar({ open: true, message: "Login Successful", severity: "success" });

          // Redirect based on role
          setTimeout(() => {
            if (currentUser.role === "ROLE_USER") {
              setIsLoggedIn(true);
              setCurrentUser(response.data[0])
              navigate("/userhome");
            } else if (currentUser.role === "ROLE_ADMIN") {
              setIsLoggedIn(true);
              setCurrentUser(response.data[0])
              navigate("/adminhome");
            }
          }, 1000); // Delay navigation to allow Snackbar visibility
        } else {
          setSnackbar({ open: true, message: "Login failed! Incorrect password or Email Id .", severity: "error" });
        }
      } catch (error) {
        setSnackbar({ open: true, message: "User not found!", severity: "error" });
      }
    };
    getUser();
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 8,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="./dairies/dairy.jpg"
          alt="Dairy Delights Logo"
          sx={{ width: 150, height: 150 }}
        />

        {/* Title */}
        <Typography variant="h5" fontWeight="bold">
          Dairy Delights Login
        </Typography>

        {/* Login Form */}
        <form onSubmit={handleSubmit(checkLogin)} style={{ width: "100%" }}>
          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("emailid", { required: "Email is required", pattern: { 
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
              message: "Enter a valid email" 
            }})}
            error={errors.emailid}
            helperText={errors.emailid?.message}
            sx={{ mb: 2 }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password", { required: "Password is required", minLength: { 
              value: 5, 
              message: "Password must be at least 5 characters" 
            }})}
            error={errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />

          {/* Login Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>

      {/* Snackbar for Alerts */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
