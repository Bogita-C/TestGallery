import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  CardActionArea,
  Alert
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { findUserByEmail } from '../utils/userUtils';

function AlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndAlbums = async () => {
      try {
        const user = await findUserByEmail(currentUser.email);
        if (!user) {
          setError('User not found');
          setLoading(false);
          return;
        }
        
        setUserId(user.id);
        
        // Fetch albums for this user
        const albumsResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
        const userAlbums = albumsResponse.data.filter(album => album.userId === user.id);
        setAlbums(userAlbums);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch albums');
        setLoading(false);
      }
    };

    if (currentUser?.email) {
      fetchUserAndAlbums();
    }
  }, [currentUser]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleAlbumClick = (albumId) => {
    navigate(`/photos/${albumId}`);
  };

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Albums
        </Typography>
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        ) : (
          <>
            <Box sx={{ position: 'relative', mb: 4 }}>
              <TextField
                fullWidth
                label="Search Albums"
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
              {filteredAlbums.map(album => (
                <Grid item xs={12} sm={6} md={4} key={album.id}>
                  <Card>
                    <CardActionArea onClick={() => handleAlbumClick(album.id)}>
                      <CardContent>
                        <Typography variant="h6" component="h2">
                          {album.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
}

export default AlbumPage;
