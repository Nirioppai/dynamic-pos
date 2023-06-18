import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
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

  postOne: async (invoice: any): Promise<any> => {
    const { orderDetails, ...invoiceData } = invoice;

    // Initialize invoiceData's iterationCount to 1
    invoiceData.iterationCount = 1;

    // Create serviceSale and productSale documents
    const serviceSaleData = {
      storeId: invoiceData.storeId,
      services: orderDetails.services,
      subtotal: orderDetails.services.reduce(
        (total: any, service: any) => total + service.price,
        0
      ),
      status: 'Successful',
      iterationCount: 1,
    };

    const productSaleData = {
      storeId: invoiceData.storeId,
      products: orderDetails.products,
      subtotal: orderDetails.products.reduce(
        (total: any, product: any) => total + product.price,
        0
      ),
      status: 'Successful',
      iterationCount: 1,
    };

    const serviceSaleRef = await addDoc(
      collection(db, KEYS.serviceSales),
      serviceSaleData
    );

    const productSaleRef = await addDoc(
      collection(db, KEYS.productSales),
      productSaleData
    );

    // Include the IDs in the invoiceData
    invoiceData.serviceSaleId = serviceSaleRef.id;
    invoiceData.productSaleId = productSaleRef.id;

    const invoiceRef = await addDoc(collection(db, KEYS.invoices), invoiceData);

    // Update serviceSale and productSale documents with the invoiceId
    await setDoc(
      doc(db, KEYS.serviceSales, serviceSaleRef.id),
      {
        invoiceId: invoiceRef.id,
      },
      { merge: true }
    );

    await setDoc(
      doc(db, KEYS.productSales, productSaleRef.id),
      {
        invoiceId: invoiceRef.id,
      },
      { merge: true }
    );

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
