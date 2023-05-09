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
import { CashierSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const cashierInstanceRef = collection(db, KEYS.cashiers);
const cashierInstanceKey = KEYS.cashiers;

const storeInstanceKey = KEYS.storeInstances;

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const cashiersService2 = createGenericService<CashierSchema>(
  KEYS.cashiers
);

export const cashiersService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER
  getCashiers: async (ownerId: string): Promise<any> => {
    const q = query(
      cashierInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getCashiersInStore: async (storeId: string): Promise<any> => {
    const q = query(
      cashierInstanceRef,
      where('storesAssigned', 'array-contains', storeId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  postOne: async (cashier: CashierSchema): Promise<any> => {
    const data = await addDoc(cashierInstanceRef, cashier);

    return {
      // @ts-ignore
      _id: data.id,
      ...cashier,
    };
    // check if user has cashier instance credits available
    // check if cashier name is already taken
    // if not, create empty cashiers object too
    // return stor cashier
    // initializee
  },
  postOneCashierInsideStore: async (cashier: CashierSchema): Promise<any> => {
    const data = await addDoc(cashierInstanceRef, cashier);
    const storeId = cashier.storeId;
    // @ts-ignore
    const storeRef = doc(db, storeInstanceKey, storeId);
    const cashierRef = doc(db, cashierInstanceKey, data.id);
    // Update cashier stores array and insert ID of newly created cashier
    await updateDoc(storeRef, { cashiers: arrayUnion(data.id) });
    await updateDoc(cashierRef, {
      storesAssigned: arrayUnion(storeId),
    });
    return {
      // @ts-ignore
      _id: data.id,
      ...cashier,
    };
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.cashiers, storeId));

    // throw new Error('WEW');

    return data;
  },
};
