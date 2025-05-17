import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  useTheme
} from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import { policeOfficerApi } from '../../api/policeofficerapi';
import IssueFineModal from './IssueFineModal';
import OfficerList from './OfficerList';
import FineList from './FineList';
import EditOfficerModal from './EditOfficerModal';
import AddOfficerModal from './AddOfficerModal';
import OfficerFinesTable from './OfficerFinesTable';

const PoliceOfficerPage = () => {
  const { user, logout } = useAuth();
  const [officers, setOfficers] = useState([]);
  const [fines, setFines] = useState([]);
  const [showIssueFineModal, setShowIssueFineModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [searchNIC, setSearchNIC] = useState('');
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      loadOfficers();
    }
  }, [user]);

  const loadOfficers = async () => {
    try {
      const response = await policeOfficerApi.getAll(user.token);
      const data = await response.json();
      setOfficers(data.newUser);
    } catch (error) {
      console.error('Error loading officers:', error);
    }
  };

  const handleSearchFines = async () => {
    try {
      const response = await policeOfficerApi.getFinesByNIC(searchNIC, user.token);
      const data = await response.json();
      setFines(data.data);
      //alert(JSON.stringify(data.data[0]))
    } catch (error) {
      console.error('Error searching fines:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#0B2447', minHeight: '100vh', py: 4, color: '#fff' }}>
      <Container>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="#fff">
            Police Officer Dashboard
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#dc3545',
              '&:hover': { bgcolor: '#b52d3b' },
            }}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>

        {/* Main Grid */}
        <Grid container spacing={4}>

          {/* Fine Management */}
          <Grid item xs={12} md={12}>
            <Paper
              elevation={3}
              sx={{
                bgcolor: '#0078AA',
                color: '#fff',
                p: 3,
                borderRadius: 3,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Fine Management</Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#198754',
                    '&:hover': { bgcolor: '#146c43' },
                  }}
                  onClick={() => setShowIssueFineModal(true)}
                >
                  Issue Fine
                </Button>
              </Box>

              <Box display="flex" gap={2} mb={2}>
                <TextField
                  label="Search by Licence ID"
                  variant="outlined"
                  fullWidth
                  value={searchNIC}
                  onChange={(e) => setSearchNIC(e.target.value)}
                  sx={{
                    input: { color: '#fff' },
                    label: { color: '#ccc' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#ccc' },
                      '&:hover fieldset': { borderColor: '#fff' },
                      '&.Mui-focused fieldset': { borderColor: '#fff' },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#004C66',
                    '&:hover': { bgcolor: '#00394d' },
                  }}
                  onClick={handleSearchFines}
                >
                  Search
                </Button>
              </Box>

              <FineList fines={fines} />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Modals */}
      {showIssueFineModal && (
        <IssueFineModal
          onClose={() => setShowIssueFineModal(false)}
          onSubmit={async (fineData) => {
            await policeOfficerApi.issueFine(fineData, user.token);
            setShowIssueFineModal(false);
            handleSearchFines();
          }}
        />
      )}

      {showEditModal && (
        <EditOfficerModal
          officer={selectedOfficer}
          onClose={() => setShowEditModal(false)}
          onSubmit={async (updatedData) => {
            await policeOfficerApi.update(selectedOfficer._id, updatedData, user.token);
            setShowEditModal(false);
            loadOfficers();
          }}
        />
      )}

      {showAddModal && (
        <AddOfficerModal
          onClose={() => setShowAddModal(false)}
          onSubmit={async (newOfficer) => {
            await policeOfficerApi.register(newOfficer);
            setShowAddModal(false);
            loadOfficers();
          }}
        />
      )}
      <OfficerFinesTable/>
    </Box>
  );
};

export default PoliceOfficerPage;
