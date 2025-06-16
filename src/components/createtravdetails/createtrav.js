import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Create({ fetchTravels, currentTraveler, setCurrentTraveler }) {
  const [travel, setTravel] = useState({
    travelerid: '',
    TravelerName: '',
    From: '',
    Todest: '',
    transmode: ''
  });

  // When editing, populate form with existing data
  useEffect(() => {
    if (currentTraveler) {
      setTravel(currentTraveler);
    }
  }, [currentTraveler]);

  // Clear form state
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

  // Handle create or update
  const handleSubmit = () => {
    const { travelerid, TravelerName, From, Todest, transmode } = travel;

    // Required field check
    if (!travelerid || !TravelerName || !From || !Todest || !transmode) {
      alert("Please fill all fields.");
      return;
    }

    if (currentTraveler?._id) {
      // Update mode
      axios.put(`http://localhost:5000/travell/${currentTraveler._id}`, travel)
        .then(() => {
          fetchTravels();
          resetForm();
        })
        .catch((err) => {
          console.error("Update error:", err);
          alert("Update failed. Try again.");
        });
    } else {
      // Create mode
      axios.post("http://localhost:5000/travell", travel)
        .then(() => {
          fetchTravels();
          resetForm();
        })
        .catch((err) => {
          if (err.response?.status === 409) {
            alert("Traveler ID already exists. Please choose a unique one.");
          } else {
            console.error("Create error:", err);
            alert("Error creating traveler.");
          }
        });
    }
  };

  return (
    <>
      <h2>{currentTraveler ? "Update Traveler" : "Create Traveler"}</h2>
      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
        <TextField
          label="ID"
          variant="standard"
          value={travel.travelerid}
          onChange={(e) => setTravel({ ...travel, travelerid: e.target.value })}
          disabled={!!currentTraveler}  // prevent ID edit in update mode
        />
        <TextField
          label="Name"
          variant="standard"
          value={travel.TravelerName}
          onChange={(e) => setTravel({ ...travel, TravelerName: e.target.value })}
        />
        <TextField
          label="From"
          variant="standard"
          value={travel.From}
          onChange={(e) => setTravel({ ...travel, From: e.target.value })}
        />
        <TextField
          label="Destination"
          variant="standard"
          value={travel.Todest}
          onChange={(e) => setTravel({ ...travel, Todest: e.target.value })}
        />
        <TextField
          label="Transport Mode"
          variant="standard"
          value={travel.transmode}
          onChange={(e) => setTravel({ ...travel, transmode: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {currentTraveler ? "Update" : "Create"}
        </Button>
      </Box>
    </>
  );
}
