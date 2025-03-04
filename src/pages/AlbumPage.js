import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

function AlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        setAlbums(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch albums');
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Albums
        </Typography>
        <TextField
          fullWidth
          label="Search Albums"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />
        <Grid container spacing={3}>
          {filteredAlbums.map(album => (
            <Grid item xs={12} sm={6} md={4} key={album.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {album.title}
                  </Typography>
                  <Typography color="textSecondary">
                    Album ID: {album.id}
                  </Typography>
                  <Typography color="textSecondary">
                    User ID: {album.userId}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default AlbumPage;
