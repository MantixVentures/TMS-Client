import React, { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Container, AppBar, Toolbar,
  IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CampaignIcon from "@mui/icons-material/Campaign";
import TimerIcon from "@mui/icons-material/Timer";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://tms-server-rosy.vercel.app";

const DriverPage = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  const civilNIC = localStorage.getItem("nicNo") || "0088675443v";

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/policeIssueFine/fines-get-by-NIC/${civilNIC}`);
        const finesList = response.data.data || [];

        const finesWithDetails = await Promise.all(
          finesList.map(async (fine) => {
            try {
              const fineDetailsRes = await axios.get(`${BASE_URL}/fine/${fine.fineManagementId}`);
              const fineDetails = fineDetailsRes.data.data;
              return {
                ...fine,
                amount: parseFloat(fineDetails.fine),
                type: fineDetails.type,
              };
            } catch (detailErr) {
              console.error("Error fetching fine details:", detailErr);
              return {
                ...fine,
                amount: 0,
                type: "Unknown",
              };
            }
          })
        );

        setFines(finesWithDetails);
      } catch (err) {
        console.error("Failed to fetch fines:", err);
        setFines([]); // Gracefully fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchFines();
  }, [civilNIC]);

  const handleOpenDialog = (type) => {
    setSelectedType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/driver-login");
  };

  const totalPendingAmount = fines
    .filter((fine) => !fine.isPaid)
    .reduce((sum, fine) => sum + (fine.amount || 0), 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            STFMS
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress />
            <Typography mt={2}>Loading fines...</Typography>
          </Box>
        ) : (
          <>
            <Card
              sx={{
                mb: 2, bgcolor: "#ef5350", color: "white", textAlign: "center",
                py: 2, cursor: "pointer", "&:hover": { bgcolor: "#d32f2f" },
              }}
              onClick={() => handleOpenDialog("pending")}
            >
              <CardContent>
                <CampaignIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Pending Fine Count</Typography>
                <Typography variant="h4">
                  {fines.filter((fine) => !fine.isPaid).length}
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                mb: 2, bgcolor: "#ed6c02", color: "white", textAlign: "center",
                py: 2, cursor: "pointer", "&:hover": { bgcolor: "#e65100" },
              }}
              onClick={() => handleOpenDialog("amount")}
            >
              <CardContent>
                <TimerIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Pending Fine Amount (LKR)</Typography>
                <Typography variant="h4">
                  {totalPendingAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                mb: 2, bgcolor: "#2e7d32", color: "white", textAlign: "center",
                py: 2, cursor: "pointer", "&:hover": { bgcolor: "#1b5e20" },
              }}
              onClick={() => handleOpenDialog("history")}
            >
              <CardContent>
                <ListAltIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Fine History</Typography>
              </CardContent>
            </Card>
          </>
        )}
      </Container>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedType === "pending" && "Pending Fines"}
          {selectedType === "amount" && "Fine Amount Details"}
          {selectedType === "history" && "Fine History"}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount (LKR)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No fines to display.
                    </TableCell>
                  </TableRow>
                ) : (
                  fines.map((fine) => (
                    <TableRow key={fine._id}>
                      <TableCell>{fine.date}</TableCell>
                      <TableCell>{fine.type}</TableCell>
                      <TableCell>{fine.amount ? fine.amount.toFixed(2) : "N/A"}</TableCell>
                      <TableCell>{fine.isPaid ? "Paid" : "Pending"}</TableCell>
                      <TableCell>{fine.issueLocation}</TableCell>
                      <TableCell>{fine.time}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DriverPage;
