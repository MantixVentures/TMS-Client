import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CampaignIcon from "@mui/icons-material/Campaign";
import TimerIcon from "@mui/icons-material/Timer";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";

// Mock data for fines
const mockFines = [
  {
    id: 1,
    date: "2024-03-15",
    type: "Speeding",
    amount: 250.0,
    status: "Pending",
    dueDate: "2024-04-15",
  },
  {
    id: 2,
    date: "2024-03-10",
    type: "No Parking",
    amount: 150.0,
    status: "Pending",
    dueDate: "2024-04-10",
  },
  {
    id: 3,
    date: "2024-03-05",
    type: "Red Light",
    amount: 300.0,
    status: "Pending",
    dueDate: "2024-04-05",
  },
  {
    id: 4,
    date: "2024-03-01",
    type: "No License",
    amount: 300.0,
    status: "Pending",
    dueDate: "2024-04-01",
  },
];

const DriverPage = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleOpenDialog = (type) => {
    setSelectedType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate("/driver-login");
  };

  const totalPendingAmount = mockFines.reduce(
    (sum, fine) => sum + fine.amount,
    0
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            STFMS
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {/* Pending Fine Count Card */}
        <Card
          sx={{
            mb: 2,
            bgcolor: "#ef5350",
            color: "white",
            textAlign: "center",
            py: 2,
            cursor: "pointer",
            "&:hover": {
              bgcolor: "#d32f2f",
            },
          }}
          onClick={() => handleOpenDialog("pending")}
        >
          <CardContent>
            <CampaignIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Pending Fine Count</Typography>
            <Typography variant="h4">{mockFines.length}</Typography>
          </CardContent>
        </Card>

        {/* Pending Fine Amount Card */}
        <Card
          sx={{
            mb: 2,
            bgcolor: "#ed6c02",
            color: "white",
            textAlign: "center",
            py: 2,
            cursor: "pointer",
            "&:hover": {
              bgcolor: "#e65100",
            },
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

        {/* Fine History Card */}
        <Card
          sx={{
            mb: 2,
            bgcolor: "#2e7d32",
            color: "white",
            textAlign: "center",
            py: 2,
            cursor: "pointer",
            "&:hover": {
              bgcolor: "#1b5e20",
            },
          }}
          onClick={() => handleOpenDialog("history")}
        >
          <CardContent>
            <ListAltIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Fine History</Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Dialog for displaying fine details */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
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
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockFines.map((fine) => (
                  <TableRow key={fine.id}>
                    <TableCell>{fine.date}</TableCell>
                    <TableCell>{fine.type}</TableCell>
                    <TableCell>{fine.amount.toFixed(2)}</TableCell>
                    <TableCell>{fine.status}</TableCell>
                    <TableCell>{fine.dueDate}</TableCell>
                  </TableRow>
                ))}
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
