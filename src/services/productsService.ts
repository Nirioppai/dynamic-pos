import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  // orderBy,
  query,
  // updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { ProductSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const productInstanceRef = collection(db, KEYS.products);

const storeInstanceKey = KEYS.storeInstances;

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const productsService2 = createGenericService<ProductSchema>(
  KEYS.products
);

export const productsService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER
  getProducts: async (ownerId: string): Promise<any> => {
    const q = query(
      productInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },

  getProductsInsideStore: async (
    // ownerId: string,
    storeId: string
  ): Promise<any> => {
    const docRef = doc(db, storeInstanceKey, storeId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    return docData;
  },

  postOne: async (product: ProductSchema): Promise<any> => {
    const data = await addDoc(productInstanceRef, product);

    return {
      // @ts-ignore
      _id: data.id,
      ...product,
    };
  },
  postOneInsideStore: async (product: ProductSchema): Promise<any> => {
    const data = await addDoc(productInstanceRef, product);

    return {
      // @ts-ignore
      _id: data.id,
      ...product,
    };
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.products, storeId));

    // throw new Error('WEW');

    return data;
  },
};
