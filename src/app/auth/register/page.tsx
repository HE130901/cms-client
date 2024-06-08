"use client";

import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useStateContext } from "@/context/StateContext";

const Register = () => {
  const { register } = useStateContext();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    citizenId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            label="Citizen ID"
            name="citizenId"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
