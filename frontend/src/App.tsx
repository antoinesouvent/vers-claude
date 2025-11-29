import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Admin, Resource } from "react-admin";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { fakeDataProvider } from "./fakeDataProvider";
import { hybridDataProvider } from "./apiDataProvider";
import { Dashboard } from "./components/Dashboard";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductShow,
} from "./components/Products";
import { PublicProducts } from "./components/PublicProducts";
import { ProductDetail } from "./components/ProductDetail";
import { AdminCatalogue } from "./components/AdminCatalogue";
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
  CssBaseline,
  IconButton,
} from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";

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
          <Button color="inherit" component={Link} to="/catalogue">
            Catalogue
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
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue sur TechStore
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Votre destination pour les dernières technologies et innovations
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  🚀 Technologies de Pointe
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Découvrez notre sélection de produits Apple et accessoires
                  technologiques premium.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  🛡️ Service Premium
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Support client expert, garanties étendues et conseils
                  personnalisés pour chaque achat.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  ⚡ Livraison Express
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Livraison gratuite dès 50€, retrait en magasin et suivi en
                  temps réel.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
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
            component={Link}
            to="/catalogue"
          >
            Voir notre Catalogue
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
      dataProvider={hybridDataProvider}
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
  console.log("App component rendering...");

  try {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<PublicHomepage />} />
            <Route path="/catalogue" element={<PublicProducts />} />
            <Route path="/products" element={<PublicProducts />} />
            {/* Route pour le détail produit (singulier et pluriel) */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminInterface />} />
            <Route path="/admin/catalogue" element={<AdminCatalogue />} />
            <Route path="/admin/*" element={<AdminInterface />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  } catch (error) {
    console.error("Error in App component:", error);
    return <div>Erreur dans l'application: {error.message}</div>;
  }
}

export default App;
