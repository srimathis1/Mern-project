import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
      }}
    >
      <Card
        sx={{
          padding: 5,
          borderRadius: 4,
          boxShadow: '0px 8px 24px rgba(0,0,0,0.2)',
          maxWidth: 1000,
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: '#0d47a1', fontWeight: 'bold' }}
          >
            🌍 Welcome to Wanderlust Vlog
          </Typography>
          <Typography variant="h6" align="center">
            Start your travel log and explore your past journeys.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
