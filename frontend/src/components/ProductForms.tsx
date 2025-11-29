import React from 'react';
import { Create, Edit, SimpleForm, TextInput, NumberInput, TopToolbar, Button } from 'react-admin';
import { Link } from 'react-router-dom';
import { Visibility } from '@mui/icons-material';
import { ImageUpload } from './ImageUpload';

// Composant personnalisé pour l'upload d'image dans React Admin
const ImageInputCustom = ({ source, label }: { source: string; label: string }) => {
  return (
    <ImageUpload
      label={label}
      value=""
      onChange={(value) => {
        // Cette fonction sera appelée par React Admin
        console.log('Image changed:', value);
      }}
    />
  );
};

// Composant pour créer un produit avec upload d'image amélioré
export const ProductCreateCustom = () => (
  <Create 
    actions={
      <TopToolbar>
        <Button
          component={Link}
          to="/admin/products"
          variant="outlined"
        >
          Retour à la liste
        </Button>
        <Button
          component={Link}
          to="/admin/catalogue"
          startIcon={<Visibility />}
          variant="outlined"
        >
          Voir le catalogue
        </Button>
      </TopToolbar>
    }
  >
    <SimpleForm>
      <TextInput source="name" label="Nom du produit" required />
      <TextInput source="description" label="Description" multiline rows={3} />
      <NumberInput source="price" label="Prix (€)" min={0} step={0.01} />
      <NumberInput source="stock" label="Stock" min={0} />
      <TextInput source="image" label="URL de l'image" />
    </SimpleForm>
  </Create>
);

// Composant pour éditer un produit avec upload d'image amélioré
export const ProductEditCustom = () => (
  <Edit 
    actions={
      <TopToolbar>
        <Button
          component={Link}
          to="/admin/products"
          variant="outlined"
        >
          Retour à la liste
        </Button>
        <Button
          component={Link}
          to="/admin/catalogue"
          startIcon={<Visibility />}
          variant="outlined"
        >
          Voir le catalogue
        </Button>
      </TopToolbar>
    }
  >
    <SimpleForm>
      <TextInput source="name" label="Nom du produit" required />
      <TextInput source="description" label="Description" multiline rows={3} />
      <NumberInput source="price" label="Prix (€)" min={0} step={0.01} />
      <NumberInput source="stock" label="Stock" min={0} />
      <TextInput source="image" label="URL de l'image" />
    </SimpleForm>
  </Edit>
);


