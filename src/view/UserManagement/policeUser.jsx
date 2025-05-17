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
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import COLORS from "../../utils/Colors";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PoliceUser = () => {
  const [policeOfficersData, setPoliceOfficersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPoliceOfficers();
  }, []);

  const fetchPoliceOfficers = async () => {
    try {
      const response = await axios.get(
        "https://tms-server-rosy.vercel.app/policeOfficers/getall"
      );
      setPoliceOfficersData(response.data.user.newUser);
    } catch (error) {
      console.error("Error fetching police officers data:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editPolice/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tms-server-rosy.vercel.app/policeOfficers/delete/${id}`);
      fetchPoliceOfficers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting police officer:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: 800,
          }}
        >
          Police Officers
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
          onClick={() => navigate("/newpolice")}
        >
          + New Officer
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="police officers table">
          <TableHead>
            <TableRow sx={{ backgroundColor: COLORS.bgBlue }}>
              <TableCell sx={{ color: "#fff" }}>Profile</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Station</TableCell>
              <TableCell sx={{ color: "#fff" }}>Badge Number</TableCell>
              <TableCell sx={{ color: "#fff" }}>Contact</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policeOfficersData.map((officer) => (
              <TableRow
                key={officer._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Avatar src={officer.profileImg || profile} />
                </TableCell>
                <TableCell>{officer.name}</TableCell>
                <TableCell>{officer.station}</TableCell>
                <TableCell>{officer.badgeNumber}</TableCell>
                <TableCell>{officer.contactInfo}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(officer._id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(officer._id)}
                    color="error"
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

export default PoliceUser;
