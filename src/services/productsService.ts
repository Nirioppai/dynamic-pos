import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  // orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { ProductSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const productInstanceRef = collection(db, KEYS.products);
const productInstanceKey = KEYS.products;
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
  getProductsInStore: async (storeId: string): Promise<any> => {
    const q = query(
      productInstanceRef,
      where('storesAssigned', 'array-contains', storeId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },

  postOne: async (product: Omit<ProductSchema, 'storeId'>): Promise<any> => {
    const data = await addDoc(productInstanceRef, product);

    return {
      // @ts-ignore
      _id: data.id,
      ...product,
    };
  },
  postOneInsideStore: async (product: ProductSchema): Promise<any> => {
    const data = await addDoc(productInstanceRef, product);
    const storeId = product.storeId;
    // @ts-ignore

    const storeRef = doc(db, storeInstanceKey, storeId);
    const productRef = doc(db, productInstanceKey, data.id);
    // Update product stores array and insert ID of newly created product
    await updateDoc(storeRef, { products: arrayUnion(data.id) });
    await updateDoc(productRef, { storesAssigned: arrayUnion(storeId) });
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
