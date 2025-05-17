import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from '@mui/material';

const modalStyle = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1300,
};

const EditOfficerModal = ({ officer, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: officer.name || '',
    badgeNumber: officer.badgeNumber || '',
    station: officer.station || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={modalStyle}>
      <Paper sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Edit Officer
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Badge Number"
            name="badgeNumber"
            value={formData.badgeNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Station"
            name="station"
            value={formData.station}
            onChange={handleChange}
            fullWidth
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => onSubmit(formData)}>
              Update
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditOfficerModal;
