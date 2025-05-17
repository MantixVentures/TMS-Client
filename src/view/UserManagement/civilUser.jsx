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

const CivilUser = () => {
  const [civilUsersData, setCivilUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCivilUsers();
  }, []);

  const fetchCivilUsers = async () => {
    try {
      const response = await axios.get("https://tms-server-rosy.vercel.app/users/getall");
      setCivilUsersData(response.data.user.newUser);
    } catch (error) {
      console.error("Error fetching civil users data:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editCivil/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tms-server-rosy.vercel.app/users/delete/${id}`);
      fetchCivilUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting civil user:", error);
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
          Civil Users
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
          onClick={() => navigate("/newcivil")}
        >
          + New Civil User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="civil users table">
          <TableHead>
            <TableRow sx={{ backgroundColor: COLORS.bgBlue }}>
              <TableCell sx={{ color: "#fff" }}>Profile</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>NIC</TableCell>
              <TableCell sx={{ color: "#fff" }}>Contact</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {civilUsersData.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Avatar src={user.profileImg || profile} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nic}</TableCell>
                <TableCell>{user.contactInfo}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(user._id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user._id)}
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

export default CivilUser;
