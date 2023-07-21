import { FC, useMemo, useState } from 'react';

import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { useQueries } from 'react-query';

import BarGraph from './BarGraph';
import MultiLineGraph from './MultiLineGraph';
import PieChart from './PieChart';

import { PageContentWrapper } from '~/components';
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
        (invoice: any) => invoice.name === selectedInvoice
      );
      // Assuming invoices have a 'name' property. Adjust as needed.
    }
  }, [selectedInvoice, invoices]);

  const isLoading = queries.some((q) => q.isLoading);

  const handleInvoiceChange = (event: any) => {
    setSelectedInvoice(event.target.value);
  };

  if (!isLoading && stores[0].status !== 'Pending') {
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
              <MenuItem key={invoice._id} value={invoice.name}>
                {invoice.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <MultiLineGraph invoices={filteredInvoices} isLoading={isLoading} />

        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <BarGraph invoices={filteredInvoices} isLoading={isLoading} />
          </Grid>
          <Grid item xs={8}>
            <PieChart invoices={filteredInvoices} isLoading={isLoading} />
          </Grid>
        </Grid>
      </PageContentWrapper>
    );
  } else {
    return <BusinessDetails />;
  }
};

export default BusinessOwnerSales;
