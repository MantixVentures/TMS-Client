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
  CircularProgress,
  Typography
} from '@mui/material';
import { policeFineApi } from '../../api/finemanagementapi';

const FineList = ({ fines }) => {
  const [offences, setOffences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all offences on component mount
  useEffect(() => {
    const fetchAllOffences = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await policeFineApi.getAllOffences();
        if (!response.ok) {
          throw new Error('Failed to fetch offences');
        }
        const data = await response.json();
        setOffences(data.data || []);
      } catch (err) {
        setError('Failed to load offence data');
        console.error('Error fetching offences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOffences();
  }, []);

  // Create a map of offence IDs to offence names
  const offenceMap = offences.reduce((map, offence) => {
    map[offence._id] = offence.offence;
    return map;
  }, {});

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

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>Offence</strong></TableCell>
              <TableCell><strong>Vehicle Number</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fines && fines.map((fine, index) => (
              <TableRow key={index}>
                <TableCell>{fine.date}</TableCell>
                <TableCell>{fine.time}</TableCell>
                <TableCell>
                  {offenceMap[fine.fineManagementId] || 'Unknown Offence'}
                </TableCell>
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

export default FineList;