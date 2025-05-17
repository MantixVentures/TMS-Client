import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import COLORS from "../../utils/Colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NormalFines = () => {
  const navigate = useNavigate();
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await axios.get("https://tms-server-rosy.vercel.app/fine/all");
        // Filter only normal fines
        const normalFines = response.data.data.filter(
          (fine) => fine.type?.toLowerCase() === "normal"
        );
        setFines(normalFines);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fines:", error);
        setLoading(false);
      }
    };

    fetchFines();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tms-server-rosy.vercel.app/fine/${id}`);
      // Refresh the fines list after deletion
      const response = await axios.get("https://tms-server-rosy.vercel.app/fine/all");
      const normalFines = response.data.filter(
        (fine) => fine.type?.toLowerCase() === "normal"
      );
      setFines(normalFines);
    } catch (error) {
      console.error("Error deleting fine:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "paid":
        return "success";
      case "overdue":
        return "error";
      default:
        return "default";
    }
  };

  const getNatureColor = (nature) => {
    switch (nature?.toLowerCase()) {
      case "low":
        return COLORS.lightBlue;
      case "medium":
        return COLORS.orangeColor;
      case "high":
        return COLORS.redColor;
      default:
        return COLORS.greyColor;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: 800, color: COLORS.black }}
        >
          Normal Fines Management
        </Typography>
        <Button
          sx={{
            bgcolor: COLORS.orangeColor,
            color: COLORS.white,
            fontWeight: 700,
            "&:hover": {
              bgcolor: COLORS.lightBlue,
              color: COLORS.black,
            },
          }}
          onClick={() => navigate("/finesdetails")}
        >
          + New Fine
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: COLORS.bgBlue }}>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Offence</TableCell>
              <TableCell sx={{ color: "#fff" }}>Nature</TableCell>
              <TableCell sx={{ color: "#fff" }}>Type</TableCell>
              <TableCell sx={{ color: "#fff" }}>Fine Amount</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines.map((fine, index) => (
              <TableRow
                key={fine._id || index}
                sx={{
                  bgcolor: index % 2 === 0 ? COLORS.white : "#f8f9fa",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <TableCell sx={{ color: COLORS.black }}>{fine._id}</TableCell>
                <TableCell sx={{ color: COLORS.black }}>
                  {fine.offence}
                </TableCell>
                <TableCell>
                  <Chip
                    label={fine.nature}
                    sx={{
                      bgcolor: getNatureColor(fine.nature),
                      color: COLORS.white,
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: COLORS.black }}>{fine.type}</TableCell>
                <TableCell sx={{ color: COLORS.black }}>
                  Rs. {fine.fine}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/editFines/${fine._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(fine._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NormalFines;
