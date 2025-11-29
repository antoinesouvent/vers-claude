import { hydraDataProvider } from "@api-platform/admin";
import { fakeDataProvider } from "./fakeDataProvider";

const apiUrl = "https://localhost:8000/api";

// DataProvider API Platform
const apiPlatformProvider = hydraDataProvider({
  entrypoint: apiUrl,
});

// DataProvider hybride avec fallback
export const hybridDataProvider = {
  getList: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.getList(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.getList(resource, params);
    }
  },

  getOne: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.getOne(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.getOne(resource, params);
    }
  },

  create: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.create(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.create(resource, params);
    }
  },

  update: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.update(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.update(resource, params);
    }
  },

  updateMany: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.updateMany(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.updateMany(resource, params);
    }
  },

  delete: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.delete(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.delete(resource, params);
    }
  },

  deleteMany: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.deleteMany(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.deleteMany(resource, params);
    }
  },

  getMany: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.getMany(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.getMany(resource, params);
    }
  },

  getManyReference: async (resource: string, params: any) => {
    try {
      return await apiPlatformProvider.getManyReference(resource, params);
    } catch (error) {
      console.warn(
        "API non disponible, utilisation des données factices:",
        error
      );
      return await fakeDataProvider.getManyReference(resource, params);
    }
  },
};
