import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Travel from './components/showtravdetails/showtrav';
import Create from './components/createtravdetails/createtrav';
import useStyles from './style';
import axios from 'axios';

function App() {
  const classes = useStyles();
  const [travellist, settravellist] = useState([]);
  const [currentTraveler, setCurrentTraveler] = useState(null); // for edit

  const fetchTravels = () => {
    axios.get("http://localhost:5000/travell")
      .then((res) => settravellist(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h4" align="center">
          Where Will Your Wanderlust Take You?
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Create
                fetchTravels={fetchTravels}
                currentTraveler={currentTraveler}
                setCurrentTraveler={setCurrentTraveler}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Travel
                travellist={travellist}
                fetchTravels={fetchTravels}
                setCurrentTraveler={setCurrentTraveler}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
