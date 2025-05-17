import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import COLORS from "../../utils/Colors";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditNormalFine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    offence: "",
    nature: "",
    type: "normal",
    fine: "",
    status: "",
    fineNumber: "",
  });

  useEffect(() => {
    const fetchFineDetails = async () => {
      try {
        const response = await axios.get(`https://tms-server-rosy.vercel.app/fine/${id}`);
        const fineData = response.data.data;
        setFormData({
          offence: fineData.offence || "",
          nature: fineData.nature || "",
          type: "normal",
          fine: fineData.fine || "",
          status: fineData.status || "",
          fineNumber: fineData.fineNumber || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fine details:", error);
        setLoading(false);
      }
    };

    fetchFineDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://tms-server-rosy.vercel.app/fine/${id}`, formData);
      navigate("/normalfines");
    } catch (error) {
      console.error("Error updating fine:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 4, fontWeight: 600, color: COLORS.black }}
        >
          Edit Normal Fine
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 3 }}>
            <TextField
              fullWidth
              label="Offence"
              name="offence"
              value={formData.offence}
              onChange={handleChange}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Nature</InputLabel>
              <Select
                name="nature"
                value={formData.nature}
                onChange={handleChange}
                label="Nature"
                required
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Fine Amount"
              name="fine"
              type="number"
              value={formData.fine}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Fine Number"
              name="fineNumber"
              value={formData.fineNumber}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
                required
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/normalfines")}
                sx={{ color: COLORS.black, borderColor: COLORS.black }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                sx={{
                  bgcolor: COLORS.orangeColor,
                  color: COLORS.white,
                  "&:hover": {
                    bgcolor: COLORS.lightBlue,
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditNormalFine;
