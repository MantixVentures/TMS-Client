import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fineTypeData = [
  {
    fineType: "Speeding",
    cost: 2500,
    description: "Exceeding speed limit",
  },
  {
    fineType: "Red Light Violation",
    cost: 3000,
    description: "Running a red light",
  },
  {
    fineType: "No Parking",
    cost: 1500,
    description: "Parking in prohibited area",
  },
  {
    fineType: "No License",
    cost: 5000,
    description: "Driving without valid license",
  },
  {
    fineType: "Drunk Driving",
    cost: 25000,
    description: "Driving under influence",
  },
];

const FineIssureForm = () => {
  const navigate = useNavigate();
  const [fineType, setFineType] = useState("");
  const [fineData, setFineData] = useState({
    drivingLicenseId: "",
    name: "",
    address: "",
    date: new Date().toISOString().split("T")[0],
    fineType: "",
    fineCost: "",
    description: "",
  });

  const formDataHandle = (event) => {
    const { name, value } = event.target;
    setFineData({ ...fineData, [name]: value });
  };

  const handleChange = (event) => {
    const selectedFine = fineTypeData.find(
      (fine) => fine.fineType === event.target.value
    );
    setFineType(event.target.value);
    setFineData((prev) => ({
      ...prev,
      fineType: event.target.value,
      fineCost: selectedFine.cost,
      description: selectedFine.description,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted fine data:", fineData);
    // Here you would typically make an API call to save the fine
    alert("Fine submitted successfully!");
    navigate("/driver-dashboard");
  };

  const handleBack = () => {
    navigate("/driver-dashboard");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Issue Fine
          </Typography>
          <Button color="inherit" onClick={handleBack}>
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
            Fine Issue Form
          </Typography>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              required
              label="Driving License ID"
              name="drivingLicenseId"
              value={fineData.drivingLicenseId}
              onChange={formDataHandle}
              fullWidth
            />

            <TextField
              required
              label="Name"
              name="name"
              value={fineData.name}
              onChange={formDataHandle}
              fullWidth
            />

            <TextField
              required
              label="Address"
              name="address"
              value={fineData.address}
              onChange={formDataHandle}
              fullWidth
              multiline
              rows={2}
            />

            <TextField
              required
              type="date"
              label="Date"
              name="date"
              value={fineData.date}
              onChange={formDataHandle}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth required>
              <InputLabel>Fine Type</InputLabel>
              <Select
                value={fineType}
                label="Fine Type"
                onChange={handleChange}
              >
                {fineTypeData.map((data) => (
                  <MenuItem key={data.fineType} value={data.fineType}>
                    {data.fineType} - LKR {data.cost}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Fine Cost (LKR)"
              value={fineData.fineCost}
              InputProps={{ readOnly: true }}
              fullWidth
            />

            <TextField
              label="Description"
              value={fineData.description}
              InputProps={{ readOnly: true }}
              fullWidth
              multiline
              rows={2}
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button variant="outlined" onClick={handleBack} sx={{ px: 4 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit} sx={{ px: 4 }}>
                Submit Fine
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FineIssureForm;
