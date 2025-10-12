import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  AppBar,
  Toolbar,
  Chip,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { fakeDataProvider } from '../fakeDataProvider';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
}

export function PublicProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fakeDataProvider.getList('products', {
          pagination: { page: 1, perPage: 50 },
          sort: { field: 'id', order: 'ASC' },
          filter: {}
        });
        setProducts(result.data);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notre Catalogue
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Accueil
          </Button>
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/admin"
            title="Administration"
          >
            <AdminPanelSettings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Notre Catalogue
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Découvrez notre gamme complète de produits technologiques
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {products.map((product) => (
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
                      component={Link}
                      to={`/product/${product.id}`}
                    >
                      En savoir plus
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      disabled={product.stock === 0}
                      onClick={() => alert(`Ajout de "${product.name}" au panier !`)}
                    >
                      {product.stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {products.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Aucun produit disponible pour le moment.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
