import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import { ArrowBack, AdminPanelSettings } from '@mui/icons-material';
import { fakeDataProvider } from '../fakeDataProvider';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string;
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const result = await fakeDataProvider.getOne('products', { id: parseInt(id) });
        setProduct(result.data);
      } catch (err) {
        setError('Produit non trouvé');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Produit non trouvé'}</Alert>
        <Button component={Link} to="/catalogue" sx={{ mt: 2 }}>
          Retour au catalogue
        </Button>
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
            component={Link} 
            to="/catalogue"
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {product.name}
          </Typography>
          <Button 
            color="inherit" 
            component={Link} 
            to="/admin"
            startIcon={<AdminPanelSettings />}
          >
            Administration
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Image du produit */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>

          {/* Informations du produit */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mr: 2 }}>
                  {parseFloat(product.price).toFixed(2)} €
                </Typography>
                <Chip 
                  label={getStockText(product.stock)} 
                  color={getStockColor(product.stock)}
                  size="large"
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Informations produit
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>ID:</strong> {product.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Stock disponible:</strong> {product.stock} unités
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Prix:</strong> {parseFloat(product.price).toFixed(2)} € TTC
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  disabled={product.stock === 0}
                  onClick={() => alert(`Ajout de "${product.name}" au panier !`)}
                  sx={{ flexGrow: 1 }}
                >
                  {product.stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large"
                  component={Link}
                  to={`/admin/products/${product.id}/edit`}
                  startIcon={<AdminPanelSettings />}
                >
                  Modifier
                </Button>
              </Box>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  component={Link} 
                  to="/catalogue"
                  variant="text"
                >
                  ← Retour au catalogue
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Section informations supplémentaires */}
        <Box sx={{ mt: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Informations complémentaires
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Livraison
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Livraison gratuite à partir de 50€. Délai de livraison : 2-3 jours ouvrés.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Retour
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Retour gratuit sous 30 jours. Produit en parfait état requis.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Support client disponible 7j/7. Garantie constructeur incluse.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
