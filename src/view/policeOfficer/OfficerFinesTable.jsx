import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { policeOfficerApi } from '../../api/policeofficerapi';
import { useAuth } from '../../utils/AuthContext';

const OfficerFinesTable = () => {
  const { user } = useAuth();
  const [allFines, setAllFines] = useState([]);
  const [filteredFines, setFilteredFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllFines = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all fines
        const response = await policeOfficerApi.getAll();
        if(response){
          console.log(response)
          //const data = await response.json();
          setAllFines(response.data || []);
        }
        if (!response) {
          throw new Error('Failed to fetch fines');
        }

      } catch (err) {
        setError(err.message);
        console.error('Error fetching fines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFines();
  }, [user.token]);

  useEffect(() => {
    console.log("all",allFines.data);
    if (allFines.data && allFines.data.length > 0) {
      // Get officer ID from localStorage (set during login)
      const officerId = localStorage.getItem('officerid');
      
      if (!officerId) {
        setError('Officer ID not found');
        return;
      }

      // Filter fines by officer I
      const officerFines = allFines.data.filter(fine => fine.policeId === officerId);
      setFilteredFines(officerFines);
    }
  }, [allFines]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (filteredFines.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No fines found for this officer</Typography>
      </Box>
    );
  }

  return (
    <Box >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Civilian NIC</strong></TableCell>
              <TableCell><strong>Offence</strong></TableCell>
              <TableCell><strong>Vehicle Number</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFines.map((fine, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(fine.date).toLocaleDateString()}</TableCell>
                <TableCell>{fine.civilNIC}</TableCell>
                <TableCell>{fine.offence}</TableCell>
                <TableCell>{fine.vehicalNumber}</TableCell>
                <TableCell>{fine.issueLocation}</TableCell>
                <TableCell
                  sx={{
                    color: fine.isPaid ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {fine.isPaid ? 'Paid' : 'Not Paid'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OfficerFinesTable;