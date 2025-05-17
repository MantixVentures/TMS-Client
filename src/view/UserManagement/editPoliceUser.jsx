import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import COLORS from "../../utils/Colors";
import axios from "axios";

const EditPoliceUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    station: "",
    badgeNumber: "",
    contactInfo: "",
    password: "",
  });

  useEffect(() => {
    const fetchOfficerData = async () => {
      try {
        const response = await axios.get(
          `https://tms-server-rosy.vercel.app/policeOfficers/getall`
        );
        const allOfficers = response.data.user.newUser;

        // Find the officer with matching ID
        const officerData = allOfficers.find((officer) => officer._id === id);

        if (!officerData) {
          setError("Officer not found");
          setLoading(false);
          return;
        }

        setFormData({
          name: officerData.name || "",
          station: officerData.station || "",
          badgeNumber: officerData.badgeNumber || "",
          contactInfo: officerData.contactInfo || "",
          password: "",
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch officer data");
        setLoading(false);
      }
    };

    fetchOfficerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create a copy of formData and remove password if empty
      const submitData = { ...formData };
      if (!submitData.password) {
        delete submitData.password;
      }

      await axios.put(
        `https://tms-server-rosy.vercel.app/policeOfficers/edit/${id}`,
        submitData
      );
      navigate("/user/police");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update officer");
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
            Edit Police Officer Details
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Officer Info Header */}
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formData.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Badge Number: {formData.badgeNumber}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Form Fields */}
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
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText="Leave blank to keep current password"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    borderColor: COLORS.bgBlue,
                    color: COLORS.bgBlue,
                    "&:hover": {
                      borderColor: COLORS.lightBlue,
                      backgroundColor: "rgba(0, 149, 255, 0.04)",
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

export default EditPoliceUser;
