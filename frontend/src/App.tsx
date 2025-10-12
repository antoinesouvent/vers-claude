import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { fakeDataProvider } from './fakeDataProvider';
import { Dashboard } from './components/Dashboard';
import { ProductList, ProductCreate, ProductEdit, ProductShow } from './components/Products';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid,
  AppBar,
  Toolbar,
  CssBaseline
} from '@mui/material';

// Composant pour la page d'accueil publique
function PublicHomepage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mon Application
          </Typography>
          <Button color="inherit" component={Link} to="/admin">
            Administration
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue sur notre site
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Découvrez nos produits et services exceptionnels
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Produits de Qualité
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nous proposons une gamme complète de produits technologiques de haute qualité.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Service Client
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Notre équipe est à votre disposition pour vous accompagner dans vos choix.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Livraison Rapide
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recevez vos commandes rapidement avec notre service de livraison express.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link}
            to="/admin"
            sx={{ mr: 2 }}
          >
            Accéder à l'Administration
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => alert('Fonctionnalité à venir!')}
          >
            Voir nos Produits
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// Composant pour l'interface d'administration
function AdminInterface() {
  return (
    <Admin 
      dataProvider={fakeDataProvider}
      dashboard={Dashboard}
      title="Gestion des Produits"
    >
      <Resource 
        name="products" 
        list={ProductList}
        create={ProductCreate}
        edit={ProductEdit}
        show={ProductShow}
      />
    </Admin>
  );
}

function App() {
  console.log('App component rendering...');
  
  try {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<PublicHomepage />} />
            <Route path="/admin/*" element={<AdminInterface />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return <div>Erreur dans l'application: {error.message}</div>;
  }
}

export default App;
