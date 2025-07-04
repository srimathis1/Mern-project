import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import useStyles from '../../style'; // Import styles

export default function Travel({ travellist, fetchTravels, setCurrentTraveler }) {
  const classes = useStyles();

  const deleteTraveler = (id) => {
    axios.delete(`http://localhost:5000/travell/${id}`)
      .then(() => fetchTravels())
      .catch(err => alert("Failed to delete traveler."));
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="travel table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableHeadCell}>Name</TableCell>
            <TableCell className={classes.tableHeadCell} align="right">ID</TableCell>
            <TableCell className={classes.tableHeadCell} align="right">From</TableCell>
            <TableCell className={classes.tableHeadCell} align="right">To</TableCell>
            <TableCell className={classes.tableHeadCell} align="right">Mode</TableCell>
            <TableCell className={classes.tableHeadCell} align="right">Actions</TableCell>
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
                <IconButton onClick={() => setCurrentTraveler(travel)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteTraveler(travel._id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
