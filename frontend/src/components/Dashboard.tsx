import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { useGetList } from 'react-admin';
import { Link } from 'react-router-dom';
import { Add, List, Visibility } from '@mui/icons-material';

export const Dashboard = () => {
  const { data: products, isLoading } = useGetList('products');

  if (isLoading) return <div>Chargement...</div>;

  const totalProducts = products?.length || 0;
  const totalStock = products?.reduce((sum, product) => sum + (product.stock || 0), 0) || 0;
  const averagePrice = products?.length > 0 
    ? products.reduce((sum, product) => sum + parseFloat(product.price || 0), 0) / products.length 
    : 0;
  const lowStockProducts = products?.filter(product => (product.stock || 0) < 10).length || 0;

  const StatCard = ({ title, value, subtitle, color = 'primary' }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography variant="h4" component="div" color={color}>
          {value}
        </Typography>
        <Typography color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Tableau de bord
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Produits" 
            value={totalProducts} 
            subtitle="Produits en catalogue"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Stock Total" 
            value={totalStock} 
            subtitle="Unités disponibles"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Prix Moyen" 
            value={`${averagePrice.toFixed(2)} €`} 
            subtitle="Prix moyen des produits"
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Stock Faible" 
            value={lowStockProducts} 
            subtitle="Produits à réapprovisionner"
            color="warning"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Actions rapides
            </Typography>
            <Typography variant="body1" paragraph>
              Accédez rapidement aux fonctionnalités principales de gestion des produits.
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={2.4}>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  to="/admin/products"
                  startIcon={<List />}
                  sx={{ height: '60px' }}
                >
                  Voir tous les produits
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/admin/products/create"
                  startIcon={<Add />}
                  sx={{ height: '60px' }}
                >
                  Ajouter un produit
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/admin/catalogue"
                  startIcon={<Visibility />}
                  sx={{ height: '60px' }}
                >
                  Voir le catalogue
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => window.location.href = '/'}
                  sx={{ height: '60px' }}
                >
                  Retour au site public
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => window.location.href = '/catalogue'}
                  sx={{ height: '60px' }}
                >
                  Voir le site public
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Bienvenue dans votre interface d'administration
            </Typography>
            <Typography variant="body1" paragraph>
              Cette interface vous permet de gérer efficacement votre catalogue de produits.
              Vous pouvez consulter, ajouter, modifier et supprimer des produits selon vos besoins.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Utilisez le menu de navigation ou les boutons ci-dessus pour accéder aux différentes fonctionnalités.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
