import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#bbdefb',
          paddingTop: 2,
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/create">
          <ListItemIcon><AddLocationAltIcon /></ListItemIcon>
          <ListItemText primary="Create Travel" />
        </ListItem>
        <ListItem button component={Link} to="/view">
          <ListItemIcon><TravelExploreIcon /></ListItemIcon>
          <ListItemText primary="View Travels" />
        </ListItem>
      </List>
    </Drawer>
  );
}
