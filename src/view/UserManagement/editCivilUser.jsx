import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import COLORS from "../../utils/Colors";
import axios from "axios";

const EditCivilUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactInfo: "",
    nic: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    const fetchCivilUserData = async () => {
      try {
        const response = await axios.get(`https://tms-server-rosy.vercel.app/users/getall`);
        const allUsers = response.data.user.newUser;

        // Find the user with matching ID
        const userData = allUsers.find((user) => user._id === id);

        if (!userData) {
          setError("User not found");
          setLoading(false);
          return;
        }

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          contactInfo: userData.contactInfo || "",
          nic: userData.nic || "",
          address: userData.address || "",
          password: "",
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchCivilUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear alerts when user starts typing
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Remove password if empty
      const submitData = { ...formData };
      if (!submitData.password) {
        delete submitData.password;
      }

      await axios.put(`https://tms-server-rosy.vercel.app/users/edit/${id}`, submitData);
      setSuccess("Civil user updated successfully!");
      // Navigate after 2 seconds
      setTimeout(() => {
        navigate("/user/civil");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
            Edit Civil User
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
                label="Email"
                name="email"
                type="email"
                value={formData.email}
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="NIC"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
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
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText="Leave blank to keep current password"
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
                  disabled={loading}
                  sx={{
                    bgcolor: COLORS.bgBlue,
                    color: "white",
                    "&:hover": {
                      bgcolor: COLORS.lightBlue,
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EditCivilUser;
