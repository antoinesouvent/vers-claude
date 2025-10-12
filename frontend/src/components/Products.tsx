import { List, Datagrid, TextField, NumberField, EditButton, ShowButton, DeleteButton, Create, Edit, SimpleForm, TextInput, NumberInput, Show, SimpleShowLayout, TopToolbar, ExportButton, ImageField, ImageInput, Button } from 'react-admin';
import { Link } from 'react-router-dom';
import { Visibility, Add } from '@mui/icons-material';
import { ImageUpload } from './ImageUpload';

// Composant pour la liste des produits
export const ProductList = () => (
  <List 
    actions={
      <TopToolbar>
        <Button
          component={Link}
          to="/admin/catalogue"
          startIcon={<Visibility />}
          variant="outlined"
        >
          Voir le catalogue
        </Button>
        <Button
          component={Link}
          to="/admin/products/create"
          startIcon={<Add />}
          variant="contained"
        >
          Ajouter un produit
        </Button>
      </TopToolbar>
    }
  >
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <ImageField source="image" label="Image" sx={{ maxWidth: 60, maxHeight: 60 }} />
      <TextField source="name" label="Nom" />
      <TextField source="description" label="Description" />
      <NumberField source="price" label="Prix (€)" />
      <NumberField source="stock" label="Stock" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Composant pour créer un produit
export const ProductCreate = () => (
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

// Composant pour éditer un produit
export const ProductEdit = () => (
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

// Composant pour afficher un produit
export const ProductShow = () => (
  <Show 
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
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <ImageField source="image" label="Image" sx={{ maxWidth: 300, maxHeight: 200 }} />
      <TextField source="name" label="Nom du produit" />
      <TextField source="description" label="Description" />
      <NumberField source="price" label="Prix (€)" />
      <NumberField source="stock" label="Stock" />
    </SimpleShowLayout>
  </Show>
);
