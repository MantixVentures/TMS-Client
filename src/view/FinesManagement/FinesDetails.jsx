import React, { useState } from "react";
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
  Alert,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from "react-router-dom";
import COLORS from "../../utils/Colors";

const FinesDetails = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    offence: "",
    nature: "",
    type: "",
    fineAmount: "",
    description: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your API call here
      console.log("Form Data:", formData);
      alert("Fine details added successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add fine details. Please try again.");
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
            Add New Fine
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Header Section */}
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: COLORS.bgBlue,
                  }}
                >
                  <PaidIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    New Fine Registration
                  </Typography>
                  <Typography color="textSecondary">
                    Fill in the details to create a new fine
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Fine Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Fine Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Offence"
                name="offence"
                value={formData.offence}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Nature</InputLabel>
                <Select
                  name="nature"
                  value={formData.nature}
                  onChange={handleChange}
                  label="Nature"
                >
                  <MenuItem value="minor">Minor</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="severe">Severe</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Type"
                >
                  <MenuItem value="normal">Normal Fine</MenuItem>
                  <MenuItem value="court">Court Fine</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fine Amount"
                name="fineAmount"
                type="number"
                value={formData.fineAmount}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: "Rs. ",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                  required
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
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
                  sx={{
                    bgcolor: COLORS.bgBlue,
                    color: "white",
                    "&:hover": {
                      bgcolor: COLORS.lightBlue,
                    },
                  }}
                >
                  Create Fine
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default FinesDetails;
