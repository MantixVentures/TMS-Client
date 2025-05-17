import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  Alert,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import COLORS from "../../utils/Colors";
import axios from "axios";

const NewPoliceUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    badgeNumber: "",
    station: "",
    contactInfo: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear alerts when user starts typing
    setError(null);
    setSuccess(null);

    // Password validation
    if (name === "confirmPassword" || name === "password") {
      if (name === "confirmPassword" && value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else if (
        name === "password" &&
        value !== formData.confirmPassword &&
        formData.confirmPassword
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...apiData } = formData;

      const response = await axios.post(
        "https://tms-server-rosy.vercel.app/policeOfficers/auth/register",
        apiData
      );
      console.log("Response:", response.data);
      setSuccess("Police officer registered successfully!");
      // Navigate after 2 seconds
      setTimeout(() => {
        navigate("/user/police");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.message || "Failed to register police officer"
      );
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        {/* Header with Back Button */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              mr: 2,
              bgcolor: COLORS.lightBlue,
              color: "white",
              "&:hover": {
                bgcolor: COLORS.bgBlue,
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Add New Police Officer
          </Typography>
        </Box>

        {/* Alerts */}
        <Box sx={{ mb: 3 }}>
          {error && (
            <Alert
              severity="error"
              onClose={() => setError(null)}
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Profile Section */}
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: COLORS.bgBlue,
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    New Police Officer Registration
                  </Typography>
                  <Typography color="textSecondary">
                    Fill in the details to create a new police officer account
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Police Information */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 2, mt: 2 }}
              >
                Police Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Badge Number"
                name="badgeNumber"
                value={formData.badgeNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Police Station"
                name="station"
                value={formData.station}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Password Section */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 2, mt: 2 }}
              >
                Security
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                error={!!passwordError}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    borderColor: COLORS.bgBlue,
                    color: COLORS.bgBlue,
                    "&:hover": {
                      borderColor: COLORS.lightBlue,
                      bgcolor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!!passwordError}
                  sx={{
                    bgcolor: COLORS.bgBlue,
                    color: "white",
                    "&:hover": {
                      bgcolor: COLORS.lightBlue,
                    },
                  }}
                >
                  Create Police Officer
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewPoliceUser;
