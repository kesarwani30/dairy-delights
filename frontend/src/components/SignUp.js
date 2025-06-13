import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper, Snackbar, Alert, Grid } from "@mui/material";
import axios from "axios";

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data; // Remove confirmPassword before sending data to backend
      userData.role="ROLE_USER";
      await axios.post(`${process.env.REACT_APP_BASEURL}/users`, userData);

      setSnackbar({ open: true, message: "Account created successfully!", severity: "success" });

      setTimeout(() => {
        navigate("/login"); // Redirect to login page after success
      }, 2000);
    } catch (error) {
      setSnackbar({ open: true, message: "Error creating account. Try again!", severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 8 }}>
        {/* Logo */}
        <Box component="img" src="./dairies/dairy.jpg" alt="Dairy Delights Logo" sx={{ width: 150, height: 150 }} />

        {/* Title */}
        <Typography variant="h5" fontWeight="bold">
          Create an Account
        </Typography>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            {/* Full Name */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                {...register("name", { required: "Name is required" })}
                error={errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            {/* Contact Number */}
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                {...register("contact", { 
                  required: "Contact number is required",
                  pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit contact number" }
                })}
                error={errors.contact}
                helperText={errors.contact?.message}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...register("emailid", { 
                  required: "Email is required",
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Enter a valid email" }
                })}
                error={errors.emailid}
                helperText={errors.emailid?.message}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                {...register("address", { required: "Address is required" })}
                error={errors.address}
                helperText={errors.address?.message}
              />
            </Grid>

            {/* City & Postal Code (Side by Side) */}
            <Grid item xs={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                {...register("city", { required: "City is required" })}
                error={errors.city}
                helperText={errors.city?.message}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                {...register("postalCode", { 
                  required: "Postal code is required",
                  pattern: { value: /^\d{6}$/, message: "Enter a valid 6-digit postal code" }
                })}
                error={errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                error={errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register("confirmPassword", { 
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match"
                })}
                error={errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>

            {/* Sign Up Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
