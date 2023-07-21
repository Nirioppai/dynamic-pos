import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { UserSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const userInstanceRef = collection(db, KEYS.users);
const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const usersService2 = createGenericService<UserSchema>(KEYS.users);

export const usersService = {
  getUser: async (ownerId: string): Promise<any> => {
    const q = query(
      userInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
};
