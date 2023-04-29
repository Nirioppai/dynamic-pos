import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  // orderBy,
  query,
  where,
  // updateDoc,
} from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { ProductCategorySchema, ServiceCategorySchema } from '~/schemas';
import { createGenericService } from '~/utils';

const productCategoryRef = collection(db, KEYS.productCategories);
const serviceCategoryRef = collection(db, KEYS.serviceCategories);

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const categoriesService2 = createGenericService<ProductCategorySchema>(
  KEYS.productCategories
);

export const categoriesService3 = createGenericService<ServiceCategorySchema>(
  KEYS.serviceCategories
);

export const categoriesService = {
  getProductCategories: async (ownerId: string): Promise<any> => {
    const q = query(
      productCategoryRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getServiceCategories: async (ownerId: string): Promise<any> => {
    const q = query(
      serviceCategoryRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  postOneProductCategory: async (
    category: ProductCategorySchema
  ): Promise<any> => {
    const data = await addDoc(productCategoryRef, category);

    return {
      // @ts-ignore
      _id: data.id,
      ...category,
    };
  },
  postOneServiceCategory: async (
    category: ServiceCategorySchema
  ): Promise<any> => {
    const data = await addDoc(serviceCategoryRef, category);

    return {
      // @ts-ignore
      _id: data.id,
      ...category,
    };
  },
  archiveOneProductCategory: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.productCategories, storeId));

    return data;
  },
  archiveOneServiceCategory: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.serviceCategories, storeId));

    return data;
  },
};
