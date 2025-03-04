import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Typography, Paper, Box } from '@mui/material';

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1">
            You are logged in as: {currentUser?.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Navigate through the menu to:
          </Typography>
          <ul>
            <li>View your profile information</li>
            <li>Browse your albums</li>
            <li>Explore photos</li>
          </ul>
        </Paper>
      </Box>
    </Container>
  );
}

export default HomePage;
