import {
  // addDoc,
  // collection,
  doc,
  // getDoc,
  // serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { db } from '~/configs';
import { BaseSchema } from '~/schemas';
// interface DocumentReferenceOverrides {
//   getAll?: string;
//   getOne?: string;
//   postOne?: string;
//   postMany?: string;
//   putOne?: string;
//   archiveOne?: string;
// }

// interface NewItemsObj<T> {
//   [key: string]: T[];
// }

// eslint-disable-next-line @typescript-eslint/ban-types
// @ts-ignore

// export const createGenericService = <TBase, TPopulated = {}>(
//   documentReference: string,
//   // @ts-ignore
//   documentReferenceOverrides?: DocumentReferenceOverrides
// ) => {

//@ts-ignore
export const createGenericService = <TBase>(documentReference: string) => {
  type T = BaseSchema & TBase;

  interface UpdateParams {
    id: string;
    item: TBase;
  }

  return {
    // getAll: async (): Promise<(T & TPopulated)[]> => {
    //   const { data } = await api.get(
    //     documentReferenceOverrides?.getAll || `${documentReference}/many`
    //   );
    //   return data.data;
    // },
    // getOne: async (id: string): Promise<T & TPopulated> => {
    //   const { data } = await api.get(
    //     `${documentReferenceOverrides?.getOne || documentReference}/${id}`
    //   );
    //   return data.data;
    // },
    // postOne: async (newItem: TBase): Promise<T> => {
    //   const { data } = await api.post(
    //     documentReferenceOverrides?.postOne || documentReference,
    //     newItem
    //   );
    //   return data.data;
    // },
    // postMany: async (newItemsObj: NewItemsObj<TBase>): Promise<T[]> => {
    //   const { data } = await api.post(
    //     documentReferenceOverrides?.postMany || `${documentReference}/many`,
    //     newItemsObj
    //   );
    //   return data.data;
    // },
    putOne: async ({ id, item }: UpdateParams): Promise<T> => {
      const docRef = doc(db, documentReference, id);
      // @ts-ignore
      const data = await updateDoc(docRef, item);

      console.log(data);

      return {
        // @ts-ignore
        _id: id,
        ...item,
      };
    },
    // archiveOne: async (id: string): Promise<T> => {
    //   const { data } = await api.delete(
    //     `${documentReferenceOverrides?.archiveOne || documentReference}/${id}`
    //   );
    //   return data.data;
    // },
  };
};
