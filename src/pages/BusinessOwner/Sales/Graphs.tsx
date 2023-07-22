import React, { FC } from 'react';

import { Grid } from '@mui/material';

import BarGraph from './BarGraph';
import MultiLineGraph from './MultiLineGraph';
import PieChart from './PieChart';
interface GraphsProps {
  invoices: any;
  isLoading: boolean;
}

const Graphs: FC<GraphsProps> = ({ invoices, isLoading }) => {
  return (
    <div>
      <MultiLineGraph invoices={invoices} isLoading={isLoading} />
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <BarGraph invoices={invoices} isLoading={isLoading} />
        </Grid>
        <Grid item xs={8}>
          <PieChart invoices={invoices} isLoading={isLoading} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Graphs;
