import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Typography, Paper, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

function UserPage() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // For demo purposes, we'll fetch the first user
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            User Profile
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {currentUser?.email}
          </Typography>
          {userData && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>Profile Information:</Typography>
              <Typography>Name: {userData.name}</Typography>
              <Typography>Username: {userData.username}</Typography>
              <Typography>Phone: {userData.phone}</Typography>
              <Typography>Website: {userData.website}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Address:</Typography>
              <Typography>
                {userData.address.street}, {userData.address.suite}
              </Typography>
              <Typography>
                {userData.address.city}, {userData.address.zipcode}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Company:</Typography>
              <Typography>Name: {userData.company.name}</Typography>
              <Typography>Catch Phrase: {userData.company.catchPhrase}</Typography>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default UserPage;
