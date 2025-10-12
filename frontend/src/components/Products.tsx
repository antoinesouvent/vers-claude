import { List, Datagrid, TextField, NumberField, EditButton, ShowButton, DeleteButton, Create, Edit, SimpleForm, TextInput, NumberInput, Show, SimpleShowLayout, TopToolbar, ExportButton } from 'react-admin';

// Composant pour la liste des produits
export const ProductList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
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
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom du produit" required />
      <TextInput source="description" label="Description" multiline rows={3} />
      <NumberInput source="price" label="Prix (€)" min={0} step={0.01} />
      <NumberInput source="stock" label="Stock" min={0} />
    </SimpleForm>
  </Create>
);

// Composant pour éditer un produit
export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom du produit" required />
      <TextInput source="description" label="Description" multiline rows={3} />
      <NumberInput source="price" label="Prix (€)" min={0} step={0.01} />
      <NumberInput source="stock" label="Stock" min={0} />
    </SimpleForm>
  </Edit>
);

// Composant pour afficher un produit
export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nom du produit" />
      <TextField source="description" label="Description" />
      <NumberField source="price" label="Prix (€)" />
      <NumberField source="stock" label="Stock" />
    </SimpleShowLayout>
  </Show>
);
