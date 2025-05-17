import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, DirectionsCar } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    licenseNo: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://tms-server-rosy.vercel.app/users/auth/register",
        {
          licenseNo: formData.licenseNo,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#0A2647",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          {/* Icon and Title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <DirectionsCar
              sx={{
                fontSize: 50,
                color: "#0A2647",
                mb: 2,
              }}
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "#0A2647",
                fontWeight: "500",
              }}
            >
              Driver Registration
            </Typography>
          </Box>

          <form onSubmit={handleRegister} noValidate style={{ width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="licenseNo"
              placeholder="Driving License No"
              name="licenseNo"
              autoComplete="licenseNo"
              autoFocus
              value={formData.licenseNo}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#0A2647" },
                  "&.Mui-focused fieldset": { borderColor: "#0A2647" },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              placeholder="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#0A2647" },
                  "&.Mui-focused fieldset": { borderColor: "#0A2647" },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#0A2647" },
                  "&.Mui-focused fieldset": { borderColor: "#0A2647" },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#0A2647" },
                  "&.Mui-focused fieldset": { borderColor: "#0A2647" },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
                backgroundColor: "#0A2647",
                "&:hover": { backgroundColor: "#144272" },
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/")}
                sx={{
                  color: "#0A2647",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
