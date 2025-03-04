import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

function PhotoPage() {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');

  useEffect(() => {
    const fetchPhotosAndAlbum = async () => {
      try {
        // Fetch album details
        const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
        setAlbumTitle(albumResponse.data.title);

        // Fetch photos for this album
        const photosResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');
        const albumPhotos = photosResponse.data.filter(photo => photo.albumId === parseInt(albumId));
        setPhotos(albumPhotos);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch photos');
        setLoading(false);
      }
    };

    if (albumId) {
      fetchPhotosAndAlbum();
    }
  }, [albumId]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          {albumTitle}
        </Typography>
        <Box sx={{ position: 'relative', mb: 4 }}>
          <TextField
            fullWidth
            label="Search Photos"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: searchTerm && (
                <IconButton
                  aria-label="clear search"
                  onClick={handleClearSearch}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Grid container spacing={3}>
          {filteredPhotos.map(photo => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.url}
                  alt={photo.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="body2" noWrap>
                    {photo.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Album ID: {photo.albumId}
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

export default PhotoPage;
