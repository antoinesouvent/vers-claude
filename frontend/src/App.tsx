import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource 
        name="products" 
        list={ListGuesser} 
        edit={EditGuesser} 
        show={ShowGuesser}
      />
    </Admin>
  );
}

export default App;
