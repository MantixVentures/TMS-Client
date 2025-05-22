import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
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

// Dashboard Card component
const DashboardCard = ({ icon: Icon, title, value, subtitle, color, isLoading }) => {
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
            <Typography variant="h4" sx={{ fontWeight: "bold", color: COLORS.bgBlue }}>
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

// Main Dashboard Page component
const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    unpaid: 0,
    unpaidToday: 0,
    courtIssued: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://tms-server-rosy.vercel.app/policeIssueFine/all");
      const fines = response.data.data;
      const today = new Date().toISOString().split("T")[0];

      setStats({
        total: fines.length,
        today: fines.filter(f => f.date === today).length,
        unpaid: fines.filter(f => !f.isPaid).length,
        unpaidToday: fines.filter(f => f.date === today && !f.isPaid).length,
        courtIssued: fines.filter(f => f.type === "court").length,
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
    const blob = new Blob([JSON.stringify(stats, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
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
            title="Total Fines"
            value={stats.total}
            subtitle="Overall"
            color={COLORS.bgBlue}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={HiDocumentReport}
            title="Fines Today"
            value={stats.today}
            subtitle="Issued Today"
            color="#4CAF50"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={TbReport}
            title="Unpaid Fines"
            value={stats.unpaid}
            subtitle="Overall"
            color="#FFC107"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={TbFileReport}
            title="Unpaid Today"
            value={stats.unpaidToday}
            subtitle="Today's Unpaid"
            color="#FF9800"
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            icon={MdReportProblem}
            title="Court Fines"
            value={stats.courtIssued}
            subtitle="Court Issued"
            color="#F44336"
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
