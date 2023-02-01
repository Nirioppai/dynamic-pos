import {
  addDoc,
  collection,
  // doc,
  getDocs,
  orderBy,
  query,
  // updateDoc,
  where,
} from 'firebase/firestore';

import { auth, db } from '~/configs';
import { KEYS } from '~/constants';
import { StoreSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const storeInstanceRef = collection(db, KEYS.storeInstances);

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const storesService2 = createGenericService<StoreSchema>(
  KEYS.storeInstances
);

export const storesService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER
  getStores: async (userId: string): Promise<any> => {
    const q = query(
      storeInstanceRef,
      where('userId', '==', userId)
      // orderBy('timestamp', 'desc')
    );

    console.log(userId);

    const data = await getDocs(q);
    return mapData(data);
  },
  postOne: async (store: StoreSchema): Promise<any> => {
    const data = await addDoc(storeInstanceRef, store);
    console.log(data.id);
    return {
      // @ts-ignore
      _id: data.id,
      ...store,
    };
    // check if user has store instance credits available
    // check if store name is already taken
    // if not, create store
    // initialize empty products object too
    // return store
  },
  putOne: async (userId: string, store: StoreSchema): Promise<any> => {
    console.log(userId);
    console.log(store);
  },

  archiveOne: async (): Promise<any> => {
    const q = query(
      storeInstanceRef,
      where('userRef', '==', auth?.currentUser?.uid),
      orderBy('timestamp', 'desc')
    );

    const querySnap = await getDocs(q);
    return mapData(querySnap);
  },
};
