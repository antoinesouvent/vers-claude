import simpleRestProvider from 'ra-data-simple-rest';

// Configuration du dataProvider pour l'API Symfony
const apiUrl = 'http://localhost:8000/api';

export const dataProvider = simpleRestProvider(apiUrl);

// DataProvider hybride qui utilise l'API quand elle est disponible, sinon le fake
export const hybridDataProvider = {
  ...dataProvider,
  
  // Override pour gérer les cas où l'API n'est pas disponible
  getList: async (resource: string, params: any) => {
    try {
      return await dataProvider.getList(resource, params);
    } catch (error) {
      console.warn('API non disponible, utilisation des données factices:', error);
      // Fallback vers les données factices
      return await fakeDataProvider.getList(resource, params);
    }
  },

  getOne: async (resource: string, params: any) => {
    try {
      return await dataProvider.getOne(resource, params);
    } catch (error) {
      console.warn('API non disponible, utilisation des données factices:', error);
      return await fakeDataProvider.getOne(resource, params);
    }
  },

  create: async (resource: string, params: any) => {
    try {
      return await dataProvider.create(resource, params);
    } catch (error) {
      console.warn('API non disponible, utilisation des données factices:', error);
      return await fakeDataProvider.create(resource, params);
    }
  },

  update: async (resource: string, params: any) => {
    try {
      return await dataProvider.update(resource, params);
    } catch (error) {
      console.warn('API non disponible, utilisation des données factices:', error);
      return await fakeDataProvider.update(resource, params);
    }
  },

  delete: async (resource: string, params: any) => {
    try {
      return await dataProvider.delete(resource, params);
    } catch (error) {
      console.warn('API non disponible, utilisation des données factices:', error);
      return await fakeDataProvider.delete(resource, params);
    }
  }
};

// Import du fakeDataProvider pour le fallback
import { fakeDataProvider } from './fakeDataProvider';
