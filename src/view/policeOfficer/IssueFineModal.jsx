import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert
} from '@mui/material';
import { policeFineApi } from '../../api/finemanagementapi';

const modalStyle = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1300,
};

const IssueFineModal = ({ onClose, onSubmit, policeId }) => {
  //alert(localStorage.getItem("officerid"))
  const [formData, setFormData] = useState({
    civilUserName: '',
    civilNIC: '',
    offence: '', // This will store the offence name for display
    issueLocation: '',
    vehicalNumber: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    policeId: localStorage.getItem("officerid"),
    fineManagementId: '', // This will store the selected offence's _id
    isPaid: false
  });

  const [loading, setLoading] = useState({
    users: false,
    offences: false,
    submitting: false
  });
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [offences, setOffences] = useState([]);

  // Fetch all users and offences on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch users
        setLoading(prev => ({ ...prev, users: true }));
        const usersResponse = await policeFineApi.getAllUsers();
        const usersData = await usersResponse.json();
        setAllUsers(usersData.data);

        // Fetch offences
        setLoading(prev => ({ ...prev, offences: true }));
        const offencesResponse = await policeFineApi.getAllOffences();
        const offencesData = await offencesResponse.json();
        setOffences(offencesData.data);
      } catch (err) {
        setError('Failed to fetch initial data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(prev => ({ ...prev, users: false, offences: false }));
      }
    };

    fetchInitialData();
  }, []);

  // Filter users when NIC changes
  useEffect(() => {
    if (formData.civilNIC.length >= 3) {
      const filtered = allUsers.filter(user => 
        user.idNumber && user.idNumber.includes(formData.civilNIC)
      );
      setFilteredUsers(filtered);

      const exactMatch = allUsers.find(user => 
        user.idNumber === formData.civilNIC
      );
      
      if (exactMatch) {
        setFormData(prev => ({
          ...prev,
          civilUserName: exactMatch.name || '',
        }));
      }
    } else {
      setFilteredUsers([]);
    }
  }, [formData.civilNIC, allUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOffenceSelect = (e) => {
    const selectedOffenceName = e.target.value;
    const selectedOffence = offences.find(o => o.offence === selectedOffenceName);
    
    setFormData(prev => ({
      ...prev,
      offence: selectedOffenceName,
      fineManagementId: selectedOffence?._id || ''
    }));
  };

  const handleUserSelect = (user) => {
    setFormData(prev => ({
      ...prev,
      civilNIC: user.idNumber,
      civilUserName: user.name || '',
    }));
    setFilteredUsers([]);
  };

  const handleSubmit = async () => {
    // Validate NIC format (9 digits + V/X)
    const nicRegex = /^[0-9]{9}[VvXx]$/;
    if (!nicRegex.test(formData.civilNIC)) {
      setError('Invalid NIC format. Use 123456789V format');
      return;
    }

    if (!formData.civilUserName || !formData.issueLocation || !formData.fineManagementId) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, submitting: true }));
      setError(null);
      
      // Prepare the data to submit (excluding the offence name)
      const { offence, ...submitData } = formData;
      await onSubmit(submitData);
    } catch (err) {
      setError('Failed to submit fine');
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  return (
    <Box sx={modalStyle}>
      <Paper sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 500 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Issue New Fine
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {(loading.users || loading.offences) && <CircularProgress sx={{ mb: 2 }} />}

        <Stack spacing={2}>
          <TextField
            required
            label="Civilian NIC"
            name="civilNIC"
            value={formData.civilNIC}
            onChange={handleChange}
            fullWidth
            inputProps={{ pattern: "[0-9]{9}[VvXx]" }}
            helperText="Format: 993090809V"
          />

          {filteredUsers.length > 0 && (
            <Paper sx={{ maxHeight: 200, overflow: 'auto' }}>
              {filteredUsers.map((user) => (
                <MenuItem 
                  key={user._id} 
                  onClick={() => handleUserSelect(user)}
                >
                  {user.idNumber} - {user.name}
                </MenuItem>
              ))}
            </Paper>
          )}

          <TextField
            required
            label="Civilian Name"
            name="civilUserName"
            value={formData.civilUserName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Vehicle Number"
            name="vehicalNumber"
            value={formData.vehicalNumber}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Offence *</InputLabel>
            <Select
              name="offence"
              value={formData.offence}
              label="Offence"
              onChange={handleOffenceSelect}
              required
            >
              {offences.map((offence) => (
                <MenuItem key={offence._id} value={offence.offence}>
                  {offence.offence} - {offence.fine} (LKR)
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            required
            label="Issue Location"
            name="issueLocation"
            value={formData.issueLocation}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={onClose} disabled={loading.submitting}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={loading.submitting}
            >
              {loading.submitting ? <CircularProgress size={24} /> : 'Submit Fine'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default IssueFineModal;