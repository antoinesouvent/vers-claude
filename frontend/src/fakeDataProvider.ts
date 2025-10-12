// Définition du type DataProvider pour React Admin
interface DataProvider {
  getList: (resource: string, params: any) => Promise<{ data: any[]; total: number }>;
  getOne: (resource: string, params: any) => Promise<{ data: any }>;
  getMany: (resource: string, params: any) => Promise<{ data: any[] }>;
  getManyReference: (resource: string, params: any) => Promise<{ data: any[]; total: number }>;
  create: (resource: string, params: any) => Promise<{ data: any }>;
  update: (resource: string, params: any) => Promise<{ data: any }>;
  updateMany: (resource: string, params: any) => Promise<{ data: any[] }>;
  delete: (resource: string, params: any) => Promise<{ data: any }>;
  deleteMany: (resource: string, params: any) => Promise<{ data: any[] }>;
}

// Données de démonstration
const fakeProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'Le dernier smartphone Apple avec puce A17 Pro et système de caméra avancé',
    price: '1199.00',
    stock: 25
  },
  {
    id: 2,
    name: 'MacBook Air M3',
    description: 'Ordinateur portable ultra-fin avec puce M3 pour une performance exceptionnelle',
    price: '1299.00',
    stock: 15
  },
  {
    id: 3,
    name: 'AirPods Pro',
    description: 'Écouteurs sans fil avec réduction active du bruit et audio spatial',
    price: '279.00',
    stock: 50
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    description: 'Tablette professionnelle avec écran Liquid Retina XDR et puce M2',
    price: '1099.00',
    stock: 8
  },
  {
    id: 5,
    name: 'Apple Watch Series 9',
    description: 'Montre connectée avec capteurs de santé avancés et GPS',
    price: '429.00',
    stock: 30
  },
  {
    id: 6,
    name: 'Magic Keyboard',
    description: 'Clavier sans fil avec trackpad intégré pour iPad',
    price: '349.00',
    stock: 12
  },
  {
    id: 7,
    name: 'Studio Display',
    description: 'Écran 27" 5K avec caméra Center Stage et système audio',
    price: '1599.00',
    stock: 5
  },
  {
    id: 8,
    name: 'Magic Mouse',
    description: 'Souris sans fil rechargeable avec surface Multi-Touch',
    price: '99.00',
    stock: 40
  }
];

let nextId = fakeProducts.length + 1;

export const fakeDataProvider: DataProvider = {
  getList: (resource, params) => {
    console.log('getList', resource, params);
    
    if (resource === 'products') {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const { q } = params.filter;
      
      let filteredProducts = [...fakeProducts];
      
      // Filtrage par recherche
      if (q) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(q.toLowerCase()) ||
          product.description.toLowerCase().includes(q.toLowerCase())
        );
      }
      
      // Tri
      filteredProducts.sort((a, b) => {
        const aVal = a[field as keyof typeof a];
        const bVal = b[field as keyof typeof b];
        
        if (order === 'ASC') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      
      // Pagination
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedProducts = filteredProducts.slice(start, end);
      
      return Promise.resolve({
        data: paginatedProducts,
        total: filteredProducts.length,
      });
    }
    
    return Promise.resolve({ data: [], total: 0 });
  },

  getOne: (resource, params) => {
    console.log('getOne', resource, params);
    
    if (resource === 'products') {
      const product = fakeProducts.find(p => p.id === params.id);
      if (product) {
        return Promise.resolve({ data: product });
      }
    }
    
    return Promise.reject(new Error('Not found'));
  },

  getMany: (resource, params) => {
    console.log('getMany', resource, params);
    
    if (resource === 'products') {
      const products = fakeProducts.filter(p => params.ids.includes(p.id));
      return Promise.resolve({ data: products });
    }
    
    return Promise.resolve({ data: [] });
  },

  getManyReference: (resource, params) => {
    console.log('getManyReference', resource, params);
    return Promise.resolve({ data: [], total: 0 });
  },

  create: (resource, params) => {
    console.log('create', resource, params);
    
    if (resource === 'products') {
      const newProduct = {
        id: nextId++,
        ...params.data,
      };
      fakeProducts.push(newProduct);
      return Promise.resolve({ data: newProduct });
    }
    
    return Promise.reject(new Error('Not implemented'));
  },

  update: (resource, params) => {
    console.log('update', resource, params);
    
    if (resource === 'products') {
      const index = fakeProducts.findIndex(p => p.id === params.id);
      if (index !== -1) {
        fakeProducts[index] = { ...fakeProducts[index], ...params.data };
        return Promise.resolve({ data: fakeProducts[index] });
      }
    }
    
    return Promise.reject(new Error('Not found'));
  },

  updateMany: (resource, params) => {
    console.log('updateMany', resource, params);
    return Promise.resolve({ data: [] });
  },

  delete: (resource, params) => {
    console.log('delete', resource, params);
    
    if (resource === 'products') {
      const index = fakeProducts.findIndex(p => p.id === params.id);
      if (index !== -1) {
        fakeProducts.splice(index, 1);
        return Promise.resolve({ data: { id: params.id } });
      }
    }
    
    return Promise.reject(new Error('Not found'));
  },

  deleteMany: (resource, params) => {
    console.log('deleteMany', resource, params);
    
    if (resource === 'products') {
      params.ids.forEach(id => {
        const index = fakeProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          fakeProducts.splice(index, 1);
        }
      });
      return Promise.resolve({ data: params.ids.map(id => ({ id })) });
    }
    
    return Promise.resolve({ data: [] });
  },
};
