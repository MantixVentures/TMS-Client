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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCivilUsers();
  }, []);

  const fetchCivilUsers = async () => {
    try {
      const response = await axios.get("https://tms-server-rosy.vercel.app/users/");
      setCivilUsersData(response.data.data);
      //alert(JSON.stringify(response.data.data))
    } catch (error) {
      console.error("Error fetching civil users data:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editCivil/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tms-server-rosy.vercel.app/users/${id}`);
      fetchCivilUsers(); // Refresh list
    } catch (error) {
      console.error("Error deleting civil user:", error);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setDialogOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: { xs: "18px", md: "20px" }, fontWeight: 800 }}>
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

      <TableContainer component={Paper}>
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
                hover
                onClick={() => handleRowClick(user)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Avatar src={user.profileImg || profile} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nic}</TableCell>
                <TableCell>{user.contactInfo}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton onClick={() => handleEdit(user._id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for user details */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Avatar
                src={selectedUser.profileImg || profile}
                sx={{ width: 80, height: 80, alignSelf: "center", mb: 2 }}
              />
              <Typography><strong>Name:</strong> {selectedUser.name}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>NIC:</strong> {selectedUser.idNumber}</Typography>
              <Typography><strong>Contact:</strong> {selectedUser.contactInfo}</Typography>
              <Typography><strong>Address:</strong> {selectedUser.address}</Typography>
              <Typography><strong>Gender:</strong> {selectedUser.gender}</Typography>
              <Typography><strong>Birth Date:</strong> {selectedUser.birthDate}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CivilUser;
