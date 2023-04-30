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
import { ServiceSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const serviceInstanceRef = collection(db, KEYS.services);

const storeInstanceKey = KEYS.storeInstances;

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const serviceService2 = createGenericService<ServiceSchema>(
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
  postOne: async (service: ServiceSchema): Promise<any> => {
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
  postOneInsideStore: async (service: ServiceSchema): Promise<any> => {
    const data = await addDoc(serviceInstanceRef, service);
    const storeId = service.storeId;
    // @ts-ignore
    const docRef = doc(db, storeInstanceKey, storeId);
    // Update service stores array and insert ID of newly created service
    await updateDoc(docRef, { services: arrayUnion(data.id) });
    return {
      // @ts-ignore
      _id: data.id,
      ...service,
    };
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.services, storeId));

    // throw new Error('WEW');

    return data;
  },
};
