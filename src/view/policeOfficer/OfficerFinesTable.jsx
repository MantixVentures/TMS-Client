import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography, CircularProgress
} from '@mui/material';
import axios from 'axios';
import { policeOfficerApi } from '../../api/policeofficerapi';
import { useAuth } from '../../utils/AuthContext';

const OfficerFinesTable = () => {
  const { user } = useAuth();
  const [filteredFines, setFilteredFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinesWithOffence = async () => {
      try {
        setLoading(true);
        const response = await policeOfficerApi.getAll();

        if (!response || !response.data || !response.data.data) {
          throw new Error("Failed to fetch fines");
        }

        const allFines = response.data.data;

        const officerId = localStorage.getItem("officerid");
        if (!officerId) {
          setError("Officer ID not found");
          return;
        }

        const officerFines = allFines.filter(fine => fine.policeId === officerId);

        // Fetch offences for each fineManagementId
        const finesWithOffences = await Promise.all(
          officerFines.map(async fine => {
            try {
              const offenceResponse = await axios.get(`https://tms-server-rosy.vercel.app/fine/${fine.fineManagementId}`);
              const offence = offenceResponse.data.data;
              //alert(JSON.stringify(offence))
              return { ...fine, offence };
            } catch (err) {
              console.error(`Failed to fetch offence for ID ${fine.fineManagementId}`, err);
              return { ...fine, offence: { name: "Unknown" } };
            }
          })
        );

        setFilteredFines(finesWithOffences);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchFinesWithOffence();
  }, [user.token]);

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
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Civilian NIC</strong></TableCell>
              <TableCell><strong>Offence</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
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
                <TableCell>{fine.offence?.offence || "N/A"}</TableCell>
                <TableCell>{fine.offence?.fine || "0"}</TableCell>
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
