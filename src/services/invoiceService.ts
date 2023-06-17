import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { InvoiceSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const invoiceInstanceRef = collection(db, KEYS.invoices);

const mapData = (data: any) =>
  // @ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const invoiceService2 = createGenericService<InvoiceSchema>(
  KEYS.invoices
);

export const invoiceService = {
  getInvoices: async (storeId: string): Promise<any> => {
    const q = query(invoiceInstanceRef, where('storeId', '==', storeId));

    const data = await getDocs(q);
    return mapData(data);
  },

  // postOne: async (invoice: InvoiceSchema): Promise<any> => {
  // postOne: async (invoice: any): Promise<any> => {
  //   // @ts-ignore
  //   const { orderDetails, ...invoiceData } = invoice;
  //   const data = await addDoc(invoiceInstanceRef, invoiceData);

  //   console.log('invoice: ', invoice);

  //   return {
  //     // @ts-ignore
  //     _id: data.id,
  //     ...invoice,
  //   };
  // },
  postOne: async (invoice: any): Promise<any> => {
    const { orderDetails, ...invoiceData } = invoice;

    // create serviceSale and productSale documents
    const serviceSaleData = { services: orderDetails.services };
    const productSaleData = { products: orderDetails.products };

    const serviceSaleRef = await addDoc(
      collection(db, KEYS.serviceSales),
      serviceSaleData
    );
    const productSaleRef = await addDoc(
      collection(db, KEYS.productSales),
      productSaleData
    );

    // include the IDs in the invoiceData
    invoiceData.serviceSaleId = serviceSaleRef.id;
    invoiceData.productSaleId = productSaleRef.id;

    const invoiceRef = await addDoc(collection(db, KEYS.invoices), invoiceData);

    return {
      _id: invoiceRef.id,
      ...invoiceData,
      orderDetails,
    };
  },

  deleteOne: async (invoiceId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.invoices, invoiceId));

    return data;
  },
};
