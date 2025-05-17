import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SecurityIcon from "@mui/icons-material/Security";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const cards = [
    {
      title: "Traffic Police Admin",
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 60, color: "#fff" }} />,
      path: "/admin-login",
      description: "Admin portal for traffic police management",
    },
    {
      title: "Driver Login",
      icon: <DirectionsCarIcon sx={{ fontSize: 60, color: "#fff" }} />,
      path: "/driver-login",
      description: "Driver portal for managing fines and records",
    },
    {
      title: "Traffic Police Officer",
      icon: <SecurityIcon sx={{ fontSize: 60, color: "#fff" }} />,
      path: "/officer-login",
      description: "Officer portal for traffic enforcement",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0B2447",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "transparent", zIndex: 2 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            STFMS
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 6, position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 200px)",
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              onClick={() => navigate(card.path)}
              sx={{
                width: 220,
                height: 220,
                bgcolor: "#0078AA",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderRadius: "16px",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "#fff",
                    mt: 1,
                  }}
                >
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Wave background */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "150px",
          zIndex: 1,
          opacity: 0.7,
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23004c66' fill-opacity='1' d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
};

export default Home;
