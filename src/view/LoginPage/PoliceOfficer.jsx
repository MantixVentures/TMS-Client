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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Security } from "@mui/icons-material";
import { useAuth } from "../../utils/AuthContext";

const OfficerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    officerId: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/policeOfficers/auth/login`,
        {
          badgeNumber: formData.officerId,
          password: formData.password,
        }
      );


      if (response.data.success) {
        const token = response.data.user.token;
        localStorage.setItem("officerToken", token);
        localStorage.setItem("officerid", formData.officerId);
        login(response.data.user);
        navigate("/officer-dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
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
            <Security
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
              Police Officer Login
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
              id="officerId"
              placeholder="Officer ID"
              name="officerId"
              autoComplete="officerId"
              autoFocus
              value={formData.officerId}
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
        </Paper>
      </Container>
    </Box>
  );
};

export default OfficerLogin;
