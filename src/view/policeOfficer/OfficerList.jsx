import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';

const OfficerList = ({ officers, onEdit, onDelete }) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Badge Number</strong></TableCell>
              <TableCell><strong>Station</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {officers && officers.map((officer) => (
              <TableRow key={officer._id}>
                <TableCell>{officer.name}</TableCell>
                <TableCell>{officer.badgeNumber}</TableCell>
                <TableCell>{officer.station}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => onEdit(officer)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => onDelete(officer._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OfficerList;
