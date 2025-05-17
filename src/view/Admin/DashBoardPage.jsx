import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  MdReportProblem,
  MdInsertChart,
  MdRefresh,
  MdFileDownload,
} from "react-icons/md";
import { TbReport, TbFileReport } from "react-icons/tb";
import { HiDocumentReport } from "react-icons/hi";
import COLORS from "../../utils/Colors";
import axios from "axios";

const DashboardCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  isLoading,
}) => {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        border: `1px solid ${COLORS.lightBlue}`,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Icon style={{ fontSize: 40, color: color }} />
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: COLORS.bgBlue }}
            >
              {value}
            </Typography>
          )}
        </Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "medium" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [dashboardData, setDashboardData] = useState({
    totalFines: 0,
    todayFines: 0,
    totalUnpaid: 0,
    todayUnpaid: 0,
    courtFines: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch total fines
      const totalFinesResponse = await axios.get(
        "http://127.0.0.1:8000/example"
      );

      // You can add more API endpoints here for different statistics
      // const todayFinesResponse = await axios.get("http://127.0.0.1:8000/today-fines");
      // const unpaidResponse = await axios.get("http://127.0.0.1:8000/unpaid-fines");
      // etc...

      setDashboardData({
        totalFines: totalFinesResponse.data[0].count,
        todayFines: 123, // Replace with actual API data
        totalUnpaid: 123, // Replace with actual API data
        todayUnpaid: 123, // Replace with actual API data
        courtFines: 123, // Replace with actual API data
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting data...");
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
          <Box>
            <Tooltip title="Refresh data">
              <IconButton onClick={handleRefresh} sx={{ mr: 1 }}>
                <MdRefresh />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<MdFileDownload />}
              onClick={handleExport}
              sx={{
                borderColor: COLORS.bgBlue,
                color: COLORS.bgBlue,
                "&:hover": {
                  borderColor: COLORS.lightBlue,
                  backgroundColor: "rgba(0, 149, 255, 0.04)",
                },
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={MdInsertChart}
            title="Total Fines Issued"
            value={dashboardData.totalFines}
            subtitle="Overall"
            color={COLORS.bgBlue}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={HiDocumentReport}
            title="Total Fines Issued"
            value={dashboardData.todayFines}
            subtitle="Today"
            color="#4CAF50"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={TbReport}
            title="Total Unpaid Payments"
            value={dashboardData.totalUnpaid}
            subtitle="Overall"
            color="#FFC107"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={TbFileReport}
            title="Total Unpaid Payments"
            value={dashboardData.todayUnpaid}
            subtitle="Today"
            color="#FF9800"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={MdReportProblem}
            title="Court Issued Fines"
            value={dashboardData.courtFines}
            subtitle="Overall"
            color="#F44336"
            isLoading={isLoading}
          />
        </Grid>
      </Grid>

      {/* You can add more sections here like charts, tables, etc. */}
    </Box>
  );
};

export default DashboardPage;
