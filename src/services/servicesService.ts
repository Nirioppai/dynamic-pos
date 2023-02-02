import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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

const serviceInstanceRef = collection(db, KEYS.services);

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const serviceService2 = createGenericService<ProductSchema>(
  KEYS.services
);

export const servicesService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER
  getServices: async (ownerId: string): Promise<any> => {
    const q = query(
      serviceInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  postOne: async (service: ProductSchema): Promise<any> => {
    const data = await addDoc(serviceInstanceRef, service);

    return {
      // @ts-ignore
      _id: data.id,
      ...service,
    };
    // check if user has service instance credits available
    // check if service name is already taken
    // if not, create empty services object too
    // return stor service
    // initializee
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.services, storeId));

    // throw new Error('WEW');

    return data;
  },
};
