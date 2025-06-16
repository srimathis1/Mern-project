import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

export default function Travel({ travellist, fetchTravels, setCurrentTraveler }) {
  const deleteTraveler = (id) => {
    axios.delete(`http://localhost:5000/travell/${id}`).then(() => fetchTravels());
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Mode</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {travellist.map((travel) => (
            <TableRow key={travel._id}>
              <TableCell>{travel.TravelerName}</TableCell>
              <TableCell align="right">{travel.travelerid}</TableCell>
              <TableCell align="right">{travel.From}</TableCell>
              <TableCell align="right">{travel.Todest}</TableCell>
              <TableCell align="right">{travel.transmode}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => setCurrentTraveler(travel)}><EditIcon /></IconButton>
                <IconButton onClick={() => deleteTraveler(travel._id)}><DeleteOutlineIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
