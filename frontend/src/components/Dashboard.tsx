import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useGetList } from 'react-admin';

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
              Bienvenue dans votre interface d'administration
            </Typography>
            <Typography variant="body1" paragraph>
              Cette interface vous permet de gérer efficacement votre catalogue de produits.
              Vous pouvez consulter, ajouter, modifier et supprimer des produits selon vos besoins.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Utilisez le menu de navigation pour accéder aux différentes fonctionnalités.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
