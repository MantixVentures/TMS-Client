import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Config";
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
  Tab,
  Tabs,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
} from "@mui/icons-material";
import { useAuth } from "../../utils/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    registerPassword: "",
  });
  const {login} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError("");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/users/auth/login`, {
        email: formData.username,
        password: formData.password,
      });

      console.log(response);

      if (response.data.success) {
        if (!response.data.user.isAdmin) {
          setError("Access denied. Only administrators are allowed.");
          return;
        }

        const { token, nicNo, isAdmin } = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("nicNo", nicNo);
        localStorage.setItem("isAdmin", JSON.stringify(true));
        localStorage.setItem("isAuthenticated", "true");
        login(response.data.user);

        navigate("/handlePage", { replace: true });
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/users/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.registerPassword,
      });

      if (response.data.success) {
        // Switch to login tab after successful registration
        setActiveTab(0);
        setFormData({
          ...formData,
          username: formData.email,
          password: "",
        });
        // Show success message
        setError("Registration successful! Please login.");
      } else {
        setError(response.data.message || "Registration failed");
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <AdminPanelSettings
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
              Admin Portal
            </Typography>
          </Box>

          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {error && (
            <Alert
              severity={error.includes("successful") ? "success" : "error"}
              sx={{ mb: 2, width: "100%" }}
            >
              {error}
            </Alert>
          )}

          {activeTab === 0 ? (
            <form onSubmit={handleLogin} noValidate style={{ width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                placeholder="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
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
                autoComplete="current-password"
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
                  "Log In"
                )}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                }}
              >
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/home")}
                  sx={{
                    color: "#0A2647",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Back to Home
                </Link>
              </Box>
            </form>
          ) : (
            <form
              onSubmit={handleRegister}
              noValidate
              style={{ width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                placeholder="Full Name"
                name="name"
                autoFocus
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
                name="registerPassword"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="registerPassword"
                value={formData.registerPassword}
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
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
