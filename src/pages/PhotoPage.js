import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  IconButton,
  Button,
  Alert
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function PhotoPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');

  useEffect(() => {
    const fetchPhotosAndAlbum = async () => {
      try {
        // Fetch album details first
        const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
        setAlbumTitle(albumResponse.data.title);

        // Then fetch photos for this specific album
        const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        setPhotos(photosResponse.data);
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

  const handleBackToAlbums = () => {
    navigate('/albums');
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBackToAlbums}
            sx={{ mr: 2 }}
          >
            Back to Albums
          </Button>
          <Typography variant="h4" component="h1">
            {albumTitle}
          </Typography>
        </Box>

        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : (
          <>
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
              {filteredPhotos.length === 0 ? (
                <Box sx={{ width: '100%', mt: 2 }}>
                  <Alert severity="info">No photos found matching your search.</Alert>
                </Box>
              ) : (
                filteredPhotos.map(photo => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="body2" noWrap>
                          {photo.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
}

export default PhotoPage;
