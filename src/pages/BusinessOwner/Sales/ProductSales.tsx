import React, { FC, useEffect, useState } from 'react';

import { Box, FormControl, MenuItem, Select } from '@mui/material';

import { DynamicAgGrid } from '~/components';

interface GraphsProps {
  stores: any;
  isLoading: boolean;
  isError: boolean;
}

const ProductSales: FC<GraphsProps> = ({ stores, isLoading, isError }) => {
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Month');
  const [numberOfDays, setNumberOfDays] = useState(1);

  useEffect(() => {
    switch (selectedFilter) {
      case 'Today':
        setNumberOfDays(1);
        break;
      case 'Week':
        setNumberOfDays(7);
        break;
      case 'Month':
        setNumberOfDays(31);
        break;
      case 'Quarter':
        setNumberOfDays(92);
        break;
      case 'Year':
        setNumberOfDays(365);
        break;
      default:
        console.error('Invalid filter selected');
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (stores && stores.length > 0) {
      const result = stores.reduce(
        (accum: any, store: any) => {
          // loop through invoices of each store
          store.invoices.forEach((invoice: any) => {
            // Check if there is a product sale in the invoice
            if (invoice.productSaleId !== 'no-sale' && invoice.productSale) {
              // Check if the invoice falls within the selected time frame
              const invoiceDate = new Date(invoice.timestamp);
              const now = new Date();
              const differenceInDays = Math.ceil(
                (now.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24)
              );

              if (differenceInDays <= numberOfDays) {
                // Add each product as a separate object, combined with invoice data
                invoice.productSale.products.forEach((product: any) => {
                  accum.products.push({
                    ...product,
                    invoiceId: invoice.id,
                    invoiceStatus: invoice.status,
                    customerName: invoice.customerName,
                    customerAddress: invoice.customerAddress,
                    customerContact: invoice.customerContact,
                    paymentType: invoice.paymentType,
                    timestamp: invoice.timestamp,
                    storeId: invoice.storeId,
                    // add here any other invoice data you need
                  });
                });
              }
            }
          });
          return accum;
        },
        {
          products: [],
        }
      );

      setProducts(result.products);
    }
  }, [stores, numberOfDays]);

  const changeValue = (e: any) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div>
      {/* Select Component Here. */}
      <Box>
        <FormControl size='small'>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            value={selectedFilter}
            label='Filter'
            onChange={changeValue}
          >
            <MenuItem value={'Today'}>Last 24 Hours (Daily)</MenuItem>
            <MenuItem value={'Week'}>Last 7 Days (Weekly)</MenuItem>
            <MenuItem value={'Month'}>Last 31 Days (Monthly)</MenuItem>
            <MenuItem value={'Quarter'}>Last 92 Days (Quarterly)</MenuItem>
            <MenuItem value={'Year'}>Last 365 Days (Yearly)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DynamicAgGrid
        rowData={products}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            headerTooltip: 'Name',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },

          {
            field: 'price',
            headerName: 'Price',
            headerTooltip: 'Price',
            minWidth: 100,
          },
          {
            field: 'customerName',
            headerName: 'Customer Name',
            headerTooltip: 'Customer Name',
            minWidth: 250,
          },
          {
            field: 'customerAddress',
            headerName: 'Customer Address',
            headerTooltip: 'Customer Address',
            minWidth: 250,
          },
          {
            field: 'customerContact',
            headerName: 'Customer Contact',
            headerTooltip: 'Customer Contact',
            minWidth: 250,
          },
          {
            field: 'paymentType',
            headerName: 'Customer Payment Type',
            headerTooltip: 'Customer Payment Type',
            maxWidth: 100,
          },
          {
            field: 'timestamp',
            headerName: 'Timestamp',
            headerTooltip: 'Timestamp',
            minWidth: 250,
            valueFormatter: (params) => {
              const date = new Date(params.value);
              return date.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
            },
          },
          {
            field: 'storeId',
            headerName: 'Store ID',
            headerTooltip: 'Store ID',
            minWidth: 250,
          },
          {
            field: 'invoiceId',
            headerName: 'Invoice ID',
            headerTooltip: 'Invoice ID',
            minWidth: 250,
          },

          {
            field: 'invoiceStatus',
            headerName: 'Invoice Status',
            headerTooltip: 'Invoice Status',
            minWidth: 250,
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: false,
          edit: false,
          archive: false,
          export: true,
        }}
      />
    </div>
  );
};

export default ProductSales;
