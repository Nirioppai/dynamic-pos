import { FC, useMemo, useState } from 'react';

import { FormControl, MenuItem, Select } from '@mui/material';
import { useQueries } from 'react-query';

import Graphs from './Graphs';
import ProductSales from './ProductSales';
import ServiceSales from './ServiceSales';

import { PageContentWrapper, TabWithContent } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { BusinessDetails } from '~/pages';
import { invoiceService, usersService } from '~/services';

const BusinessOwnerSales: FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState('All Stores');

  const queries = useQueries([
    {
      queryKey: KEYS.invoices,
      queryFn: () => invoiceService.getOwnerInvoices(),
    },
    {
      queryKey: KEYS.users,
      queryFn: () => usersService.getUser(auth?.currentUser?.uid || ''),
    },
  ]);

  const invoices = useMemo(() => queries[0].data || [], [queries]);
  const stores = queries[1].data || [];

  // Filtering invoices based on selection
  const filteredInvoices = useMemo(() => {
    if (selectedInvoice === 'All Stores') {
      return invoices;
    } else {
      return invoices.filter(
        (invoice: any) => invoice.businessName === selectedInvoice
      );
      // Assuming invoices have a 'name' property. Adjust as needed.
    }
  }, [selectedInvoice, invoices]);

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const handleInvoiceChange = (event: any) => {
    setSelectedInvoice(event.target.value);
  };

  if (!isLoading && stores[0].status !== false) {
    return (
      <PageContentWrapper title='Sales'>
        <FormControl size='small'>
          <Select
            labelId='invoice-select-label'
            id='invoice-select'
            value={selectedInvoice}
            onChange={handleInvoiceChange}
          >
            <MenuItem value={'All Stores'}>All Stores</MenuItem>
            {/* 
            Dynamically create menu items based on available invoices. 
            Replace 'invoiceName' with the actual property you want to display.
          */}
            {invoices.map((invoice: any) => (
              <MenuItem key={invoice._id} value={invoice.businessName}>
                {invoice.businessName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TabWithContent
          tabItems={[
            {
              name: 'Sales Graphs',
              content: (
                <Graphs invoices={filteredInvoices} isLoading={isLoading} />
              ),
            },
            {
              name: 'Product Sales',
              content: (
                <ProductSales
                  stores={filteredInvoices}
                  isLoading={isLoading}
                  isError={isError}
                />
              ),
            },
            {
              name: 'Service Sales',
              content: (
                <ServiceSales
                  stores={filteredInvoices}
                  isLoading={isLoading}
                  isError={isError}
                />
              ),
            },
          ]}
        />
      </PageContentWrapper>
    );
  } else {
    return <BusinessDetails />;
  }
};

export default BusinessOwnerSales;
