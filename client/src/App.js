import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Create from './components/createtravdetails/createtrav';
import Travel from './components/showtravdetails/showtrav';
import axios from 'axios';

function App() {
  const [travellist, settravellist] = useState([]);
  const [currentTraveler, setCurrentTraveler] = useState(null);

  const fetchTravels = () => {
    axios.get("http://localhost:5000/travell")
      .then((res) => settravellist(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={
              <Create
                fetchTravels={fetchTravels}
                currentTraveler={currentTraveler}
                setCurrentTraveler={setCurrentTraveler}
              />
            } />
            <Route path="/view" element={
              <Travel
                travellist={travellist}
                fetchTravels={fetchTravels}
                setCurrentTraveler={setCurrentTraveler}
              />
            } />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
