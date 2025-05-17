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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EditCourtFine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    offence: "",
    nature: "",
    type: "court",
    fine: "",
    status: "",
    caseNumber: "",
    courtDate: null,
    judge: "",
    description: "",
  });

  useEffect(() => {
    const fetchFineDetails = async () => {
      try {
        const response = await axios.get(`https://tms-server-rosy.vercel.app/fine/${id}`);
        const fineData = response.data.data;
        setFormData({
          offence: fineData.offence || "",
          nature: fineData.nature || "",
          type: "court",
          fine: fineData.fine || "",
          status: fineData.status || "",
          caseNumber: fineData.caseNumber || "",
          courtDate: fineData.courtDate ? new Date(fineData.courtDate) : null,
          judge: fineData.judge || "",
          description: fineData.description || "",
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

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      courtDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://tms-server-rosy.vercel.app/fine/${id}`, formData);
      navigate("/courtfines");
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
          Edit Court Fine
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 3 }}>
            <TextField
              fullWidth
              label="Case Number"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              required
            />

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

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Court Date"
                value={formData.courtDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              label="Judge"
              name="judge"
              value={formData.judge}
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
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />

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
                onClick={() => navigate("/courtfines")}
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

export default EditCourtFine;
