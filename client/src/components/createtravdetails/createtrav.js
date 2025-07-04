import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import axios from 'axios';

export default function Create({ fetchTravels, currentTraveler, setCurrentTraveler }) {
  const [travel, setTravel] = useState({
    travelerid: '',
    TravelerName: '',
    From: '',
    Todest: '',
    transmode: ''
  });

  useEffect(() => {
    if (currentTraveler) {
      setTravel(currentTraveler);
    }
  }, [currentTraveler]);

  const resetForm = () => {
    setTravel({
      travelerid: '',
      TravelerName: '',
      From: '',
      Todest: '',
      transmode: ''
    });
    setCurrentTraveler(null);
  };

  const handleSubmit = () => {
    const { travelerid, TravelerName, From, Todest, transmode } = travel;

    if (!travelerid || !TravelerName || !From || !Todest || !transmode) {
      alert("Please fill all fields.");
      return;
    }

    if (currentTraveler?._id) {
      // UPDATE
      axios.put(`http://localhost:5000/travell/${currentTraveler._id}`, travel)
        .then(() => {
          fetchTravels();
          resetForm();
        })
        .catch((err) => {
          console.error("Update error:", err);
          alert("Update failed.");
        });
    } else {
      // CREATE
      axios.post("http://localhost:5000/travell", travel)
        .then(() => {
          fetchTravels();
          resetForm();
        })
        .catch((err) => {
          console.error("Create error:", err);
          if (err.response?.status === 409) {
            alert("Traveler ID already exists. Please use a unique one.");
          } else if (err.response?.status === 400) {
            alert("Missing required fields. Please fill out the entire form.");
          } else if (err.code === "ERR_NETWORK") {
            alert("Server not running. Please start backend (port 5000).");
          } else {
            alert("Error creating traveler. See console for details.");
          }
        });
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 500,
        backgroundColor: '#',
        mx: 'auto'
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: '#0d47a1', fontWeight: 'bold' }}
      >
        {currentTraveler ? "Update Travel Details" : "Create Travel Entry"}
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2
        }}
      >
        <TextField
          label="Traveler ID"
          variant="outlined"
          value={travel.travelerid}
          onChange={(e) => setTravel({ ...travel, travelerid: e.target.value })}
          disabled={!!currentTraveler}
        />
        <TextField
          label="Traveler Name"
          variant="outlined"
          value={travel.TravelerName}
          onChange={(e) => setTravel({ ...travel, TravelerName: e.target.value })}
        />
        <TextField
          label="From"
          variant="outlined"
          value={travel.From}
          onChange={(e) => setTravel({ ...travel, From: e.target.value })}
        />
        <TextField
          label="Destination"
          variant="outlined"
          value={travel.Todest}
          onChange={(e) => setTravel({ ...travel, Todest: e.target.value })}
        />
        <TextField
          label="Transport Mode"
          variant="outlined"
          value={travel.transmode}
          onChange={(e) => setTravel({ ...travel, transmode: e.target.value })}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#1976d2',
            mt: 2,
            '&:hover': { backgroundColor: '#0d47a1' }
          }}
        >
          {currentTraveler ? "Update" : "Create"}
        </Button>
      </Box>
    </Paper>
  );
}
