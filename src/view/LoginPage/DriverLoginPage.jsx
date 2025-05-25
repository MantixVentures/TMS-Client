import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Config";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, DirectionsCar } from "@mui/icons-material";
import { useAuth } from "../../utils/AuthContext";

const DriverLoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {login} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/users/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const { token, isAdmin } = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", JSON.stringify(false));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("nicNo", response.data.user.nicNo);
        login(response.data.user);
        navigate("/driver-dashboard", { replace: true });
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to connect to the server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 3 : 4,
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
            <DirectionsCar
              sx={{
                fontSize: isMobile ? 40 : 50,
                color: theme.palette.primary.main,
                mb: 2,
              }}
            />
            <Typography
              component="h1"
              variant={isMobile ? "h5" : "h4"}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "500",
              }}
            >
              Driver Login
            </Typography>
          </Box>

          <form onSubmit={handleLogin} noValidate style={{ width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!error && error.includes("email")}
              disabled={loading}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!error && error.includes("password")}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
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
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Back to Home
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default DriverLoginPage;
