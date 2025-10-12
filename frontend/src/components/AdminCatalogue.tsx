import React, { useState, useEffect } from 'react';
import { useGetList } from 'react-admin';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { ArrowBack, AdminPanelSettings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
}

export function AdminCatalogue() {
  const { data: products, isLoading, error } = useGetList('products');

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'error';
    if (stock < 10) return 'warning';
    return 'success';
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return 'Rupture de stock';
    if (stock < 10) return 'Stock faible';
    return 'En stock';
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Erreur lors du chargement des produits</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => window.location.href = '/admin'}
            sx={{ mr: 2 }}
            title="Retour au tableau de bord admin"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Catalogue Admin - Vue Publique
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => window.location.href = '/catalogue'}
            sx={{ mr: 1 }}
          >
            Site Public
          </Button>
          <Button 
            color="inherit" 
            onClick={() => window.location.href = '/admin/products'}
            startIcon={<AdminPanelSettings />}
          >
            Gérer les produits
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Catalogue Admin
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Vue publique de votre catalogue depuis l'interface d'administration
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {products?.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ flexGrow: 1, mb: 2 }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {parseFloat(product.price).toFixed(2)} €
                    </Typography>
                    <Chip 
                      label={getStockText(product.stock)} 
                      color={getStockColor(product.stock)}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => window.location.href = `/admin/products/${product.id}/show`}
                    >
                      Voir en admin
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={() => window.location.href = `/admin/products/${product.id}/edit`}
                    >
                      Modifier
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {products?.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Aucun produit disponible pour le moment.
            </Typography>
            <Button 
              component={Link} 
              to="/admin/products/create"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Ajouter le premier produit
            </Button>
          </Box>
        )}

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Actions rapides
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                onClick={() => window.location.href = '/admin/products'}
                variant="contained"
              >
                Gérer tous les produits
              </Button>
              <Button 
                onClick={() => window.location.href = '/admin/products/create'}
                variant="outlined"
              >
                Ajouter un produit
              </Button>
              <Button 
                onClick={() => window.location.href = '/catalogue'}
                variant="outlined"
              >
                Voir le site public
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
