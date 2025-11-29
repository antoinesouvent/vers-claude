import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { AddPhotoAlternate, Delete, FolderOpen } from '@mui/icons-material';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

// Images prédéfinies disponibles
const predefinedImages = [
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1527864550417-7fdaf44c795f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop'
];

export function ImageUpload({ value = '', onChange, label = 'Image' }: ImageUploadProps) {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [error, setError] = useState('');

  const handleImageSelect = (imageUrl: string) => {
    onChange(imageUrl);
    setOpen(false);
    setError('');
  };

  const handleCustomUrl = () => {
    if (customUrl.trim()) {
      // Validation basique de l'URL
      try {
        new URL(customUrl);
        onChange(customUrl);
        setCustomUrl('');
        setOpen(false);
        setError('');
      } catch {
        setError('URL invalide');
      }
    }
  };

  const handleRemoveImage = () => {
    onChange('');
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      
      {value ? (
        <Card sx={{ maxWidth: 300, mb: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={value}
            alt="Image du produit"
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddPhotoAlternate />}
                onClick={() => setOpen(true)}
              >
                Changer
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={handleRemoveImage}
              >
                Supprimer
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddPhotoAlternate />}
            onClick={() => setOpen(true)}
            sx={{ mb: 1 }}
          >
            Ajouter une image
          </Button>
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FolderOpen />
            Sélectionner une image
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Images prédéfinies
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {predefinedImages.map((imageUrl, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    border: value === imageUrl ? 2 : 1,
                    borderColor: value === imageUrl ? 'primary.main' : 'divider',
                    '&:hover': { borderColor: 'primary.main' }
                  }}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <CardMedia
                    component="img"
                    height="120"
                    image={imageUrl}
                    alt={`Image ${index + 1}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom>
            Ou ajouter une URL personnalisée
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <TextField
              fullWidth
              placeholder="https://exemple.com/image.jpg"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              error={!!error}
              helperText={error}
            />
            <Button
              variant="contained"
              onClick={handleCustomUrl}
              disabled={!customUrl.trim()}
            >
              Ajouter
            </Button>
          </Box>

          {customUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Aperçu :
              </Typography>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  height="100"
                  image={customUrl}
                  alt="Aperçu"
                  sx={{ objectFit: 'cover' }}
                  onError={() => setError('Impossible de charger cette image')}
                />
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


