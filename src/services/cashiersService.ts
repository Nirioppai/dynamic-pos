import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  // orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { auth, db } from '~/configs';
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

function getFirstWord(sentence: string) {
  const index = sentence.indexOf(' '); // Find the index of the first space
  if (index === -1) {
    return sentence; // If there is no space, return the entire sentence
  } else {
    return sentence.substr(0, index); // Otherwise, return the substring before the first space
  }
}

const createUser = async (
  email: string,
  name: string,
  password: string,
  userType: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const docRef = doc(db, KEYS.users, user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: name,
        email: user.email,
        userType: userType,
        timestamp: serverTimestamp(),
      });
    }

    const userDetails = {
      id: user,
    };
    return {
      ...user,
      userDetails,
    };
  } catch (err: any) {
    throw new Error(err?.message || err);
  }
};

async function createCashier(
  storeId: string,
  cashierName: string,
  cashierPassword: string
) {
  // @ts-ignore
  try {
    const docRef = doc(db, storeInstanceKey, storeId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    console.log('cashier password: ', cashierPassword);

    await createUser(
      // @ts-ignore
      `${docData.name.split(' ').join('')}${getFirstWord(
        cashierName
      )}@gmail.com`,
      cashierName,
      cashierPassword,
      'cashier'
    );
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

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
    // @ts-ignore
    createCashier(cashier.storeId, cashier.name, cashier.password);

    // @ts-ignore
    const docRef = doc(db, storeInstanceKey, cashier.storeId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    const newCashier = {
      name: cashier.name,
      ownerId: cashier.ownerId,
      // @ts-ignore
      email: `${docData.name.split(' ').join('')}${getFirstWord(
        cashier.name
      )}@gmail.com`,
      password: cashier.password,
      storeId: cashier.storeId,
    };

    const data = await addDoc(cashierInstanceRef, newCashier);

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
    const storeId = cashier.storeId;

    // @ts-ignore
    createCashier(storeId, cashier.name, cashier.password);

    const data = await addDoc(cashierInstanceRef, cashier);

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
